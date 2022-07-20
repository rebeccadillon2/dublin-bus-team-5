import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, Column, String, Integer, Boolean, Time, Float

meta = MetaData()

db_password = 'researchteam5'
engine = create_engine('mysql+mysqlconnector://root:' +
                       db_password+'@127.0.0.1:3306/dublinBus')
dbConnection = engine.connect()

n=10000 #num of rows
df = pd.read_csv('google_transit_dublinbus/stop_times.txt',chunksize=n)

# create the table with correct datatype
stop_times = Table(
    'stop_times', meta,
    Column('id', Integer, primary_key=True),
    Column('trip_id', String(30)),
    Column('arrival_time', Time),
    Column('departure_time', Time),
    Column('stop_id', String(20)),
    Column('stop_sequence', Integer),
    Column('stop_headsign', String(30)),
    Column('pickup_type', Boolean),
    Column('drop_off_type', Boolean),
    Column('shape_dist_traveled', Float),
)
try:
    # create the table if does not exist, if error then no appending
    meta.create_all(engine, checkfirst=False)

    for chunk in df:
        chunk.to_sql('stop_times', dbConnection, if_exists='append',index=False) #insert the data in the table 

except ValueError as vx:
    print(vx)

except Exception as ex:
    print(ex)

else:
    print("Table created successfully.")

finally:
    dbConnection.close()
