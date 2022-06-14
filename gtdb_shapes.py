import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Float

meta = MetaData()

db_password = 'researchteam5'
engine = create_engine('mysql+mysqlconnector://root:'+db_password+'@127.0.0.1:3306/dublinBus')
dbConnection = engine.connect()

n=10000 #num of rows
reader = pd.read_csv('google_transit_dublinbus/shapes.txt',chunksize=n)


#create the table with correct datatype
route_shapes = Table(
   'route_shapes', meta, 
   Column('id',Integer,primary_key = True ),
    Column('shape_id', String(20)), 
   Column('shape_pt_lat', Float ), 
   Column('shape_pt_lon', Float ), 
   Column('shape_pt_sequence', Integer ),
   Column('shape_dist_traveled', Float )
)

try: 
    meta.create_all(engine,checkfirst=False) #create the table if does not exist, if error then no appending 
    
    for chunk in reader:
        chunk.to_sql('route_shapes', dbConnection, if_exists='append',index=False) #insert the data in the table 

except ValueError as vx:
     print(vx)

except Exception as ex:   
     print(ex)

else:
     print("Table created successfully.")

finally:
     dbConnection.close()