import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, Column, String, Integer, Boolean

meta = MetaData()

db_password = 'researchteam5'
engine = create_engine('mysql+mysqlconnector://root:' +
                       db_password+'@127.0.0.1:3306/dublinBus')
dbConnection = engine.connect()

n=10000 #num of rows
df = pd.read_csv('google_transit_dublinbus/trips.txt',chunksize=n)

# create the table with correct datatype
trips = Table(
    'trips', meta,
    Column('id', Integer, primary_key=True),
    Column('route_id', String(20)),
    Column('service_id', String(10)),
    Column('trip_id', String(30)),
    Column('shape_id', String(30)),
    Column('trip_headsign', String(100)),
    Column('direction_id', Boolean),

)
try:
    # create the table if does not exist, if error then no appending
    meta.create_all(engine, checkfirst=False)

    for chunk in df:
        chunk.to_sql('trips', dbConnection, if_exists='append',index=False) #insert the data in the table 

except ValueError as vx:
    print(vx)

except Exception as ex:
    print(ex)

else:
    print("Table created successfully.")

finally:
    dbConnection.close()
