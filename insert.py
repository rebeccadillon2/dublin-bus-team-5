import pandas as pd
import pymysql


def get_mysql():
    db = pymysql.connect(host='localhost',
                         user='root',
                         password='112233asd',
                         database='project',
                         charset='utf8')

    return db


def bulk_insert(sql, data):
    db = get_mysql()
    cursor = db.cursor()
    cursor.executemany(sql, data)
    db.commit()
    db.close()


def read_data(path):
    data = []
    with open(path, 'r') as f:
        f.readline()
        count = 0
        while count <= 1000:
            line = f.readline().strip()
            if not line:
                break
            temp = line.split(',')[1:]
            if len(temp) == 6:
                data.append(tuple(temp))
                count += 1

    return tuple(data)


sql = "insert into " \
      "trips(route_id,service_id,trip_id,shape_id,trip_headsign,direction_id) " \
      "values(%s,%s,%s,%s,%s,%s)"

bulk_insert(sql, read_data("source/trips.csv"))
