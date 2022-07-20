import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, DateTime

meta = MetaData()

db_password = 'researchteam5'
engine = create_engine('mysql+mysqlconnector://root:' +
                       db_password+'@127.0.0.1:3306/dublinBus')
dbConnection = engine.connect()

df = pd.read_csv('google_transit_dublinbus/calendar_dates.txt')

# correcting date format i.e., 20220612 to 2022/06/12
# code from https://www.codegrepper.com/code-examples/python/how+to+pandas+datetime+yyyymmdd+to+ddmmyy
df['date'] = pd.to_datetime(df['date'], format='%Y%m%d').dt.strftime('%Y-%m-%d %H:%M:%S')

# create the table with correct datatype
calendar_dates = Table(
    'calendar_dates', meta,
    Column('id', Integer, primary_key=True),
    Column('service_id', Integer),
    Column('date', DateTime),
    Column('exception_type', Integer),
   
)

try:
    # create the table if does not exist, if error then no appending
    meta.create_all(engine, checkfirst=False)

    df.to_sql('calendar_dates', dbConnection, if_exists='append',
                     index=False)  # insert the data in the table

except ValueError as vx:
    print(vx)

except Exception as ex:
    print(ex)

else:
    print("Table created successfully.")

finally:
    dbConnection.close()
