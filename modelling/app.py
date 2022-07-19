# import necessary modules
from flask import Flask, render_template, request
import pandas as pd
import pickle

# flask app into variable
app = Flask(__name__)

# allow prediction model on analytics page to take user inputs as prediction model parameters
@app.route('/templates/sample.html', methods=['GET', 'POST'])
def get_model():
    if request.method == 'POST':
        direction = request.form.get("direction")
        line = request.form.get("line")

        # open pickle file and load into variable clf
        with open('/Users/rebeccadillon/git/dublin-bus-team-5/data/modelling/randomforest/picklefiles/line_{line}_model/dir{direction}/line_{line}_rfr.sav', 'rb') as pickle_file:
            clf = pickle.load(pickle_file)

        planned_dep = request.form.get("planned_dep")
        weekday = request.form.get("weekday")
        wind_speed = '3.1'
        humidity = '81'
        month = request.form.get("month")
        X = pd.DataFrame([[planned_dep, weekday, wind_speed, humidity,month]], columns=[
                         "PLANNEDTIME_DEP", "WEEKDAY", "wind_speed", "humidity","MONTH"]).values

        # generate prediction
        prediction = clf.predict(X)[0]
        minutes = prediction//60
        remainder = prediction%60
        seconds = remainder*60
        result = "Triptime is " + \
            str(minutes) + " minutes and " + str(seconds) + " seconds."

    else:
        result = ""
    # print result on analytics page
    return render_template("analytics.html", output=result)
