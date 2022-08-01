from .test_setup import TestSetUp
import urllib
import urllib.request
import json

class TestViews(TestSetUp):

    def test_all_stops(self):
        response = self.client.get('/api/bus/get-all-stops/')
        self.assertEqual(response.status_code, 200)


    def test_all_routes(self):
        response = self.client.get('/api/bus/get-all-routes/')
        self.assertEqual(response.status_code, 200)


    def test_all_upcoming_stoptimes(self):
        data = {"stopId": "8220DB000024", "time": "12:00:00"}
        response = self.client.get('/api/bus/upcoming-stoptimes/', data, format='json')
        self.assertEqual(response.status_code, 200)


    def test_all_get_ml_predict_least_data(self):
        data = {
            "headSign": "Saint Pappin's Road - Blackthorn Drive (Blackthorn Road)", 
            "routeShortName": "11",
            "humidity": 84,
            "wind": 9.77,
            "seconds": 71220,
            "day": 0,
            "month": 8,
            "routeHeadSign": "St Pappin's Rd",
            "numStops": 18
            }
        response = self.client.get('/api/bus/get-ml-predict/', data, format='json')
        difference = abs(18-response.data)
        self.assertGreaterEqual(7, difference)


    def test_all_get_ml_predict_most_data(self):
        data = {
            "headSign": "Outside Heuston Train Station - Ballywaltrim", 
            "routeShortName": "145",
            "humidity": 84,
            "wind": 9.77,
            "seconds": 71220,
            "day": 0,
            "month": 8,
            "routeHeadSign": "Heuston Station",
            "numStops": 15
            }
        response = self.client.get('/api/bus/get-ml-predict/', data, format='json')
        difference = abs(15-response.data)
        self.assertGreaterEqual(7, difference)


