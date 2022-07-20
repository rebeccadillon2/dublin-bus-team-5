import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String

meta = MetaData()

db_password = 'researchteam5'
engine = create_engine('mysql+mysqlconnector://root:'+db_password+'@127.0.0.1:3306/dublinBus')
dbConnection = engine.connect()

n=10000 #num of rows
reader = pd.read_csv('google_transit_dublinbus/routes.txt',chunksize=n)


#create the table with correct datatype
#
routes = Table(
   'routes', meta, 
   Column('id',Integer,primary_key = True ),
    Column('route_id', String(20)), 
   Column('agency_id', Integer), 
   Column('route_short_name', String(5)), 
   Column('route_long_name', String(30)),
   Column('route_type', Integer)
)

try: 
    meta.create_all(engine,checkfirst=False) #create the table if does not exist, if error then no appending 
    
    for chunk in reader:
        chunk.to_sql('routes', dbConnection, if_exists='append',index=False) #insert the data in the table 

except ValueError as vx:
     print(vx)

except Exception as ex:   
     print(ex)

else:
     print("Table created successfully.")

finally:
     dbConnection.close()