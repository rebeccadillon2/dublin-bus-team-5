import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Boolean, DateTime

meta = MetaData()

db_password = 'researchteam5'
engine = create_engine('mysql+mysqlconnector://root:' +
                       db_password+'@127.0.0.1:3306/dublinBus')
dbConnection = engine.connect()

df = pd.read_csv('google_transit_dublinbus/calendar.txt')

# correcting date format i.e., 20220612 to 2022/06/12
# code from https://www.codegrepper.com/code-examples/python/how+to+pandas+datetime+yyyymmdd+to+ddmmyy
df['start_date'] = pd.to_datetime(df['start_date'], format='%Y%m%d').dt.strftime('%Y-%m-%d %H:%M:%S')
df['end_date'] = pd.to_datetime(df['end_date'], format='%Y%m%d').dt.strftime('%Y-%m-%d %H:%M:%S')

# create the table with correct datatype
calendar = Table(
    'calendar', meta,
    Column('id', Integer, primary_key=True),
    Column('service_id', String(20)),
    Column('monday', Boolean),
    Column('tuesday', Boolean),
    Column('wednesday', Boolean),
    Column('thursday', Boolean),
    Column('friday', Boolean),
    Column('saturday', Boolean),
    Column('sunday', Boolean),
    Column('start_date', DateTime),
    Column('end_date', DateTime),
)

try:
    # create the table if does not exist, if error then no appending
    meta.create_all(engine, checkfirst=False)

    df.to_sql('calendar', dbConnection, if_exists='append',
                     index=False)  # insert the data in the table

except ValueError as vx:
    print(vx)

except Exception as ex:
    print(ex)

else:
    print("Table created successfully.")

finally:
    dbConnection.close()
