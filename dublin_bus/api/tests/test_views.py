from .test_setup import TestSetUp
import urllib
import urllib.request
import json

class TestViews(TestSetUp):

    def test_all_stops(self):
        response = self.client.get('/api/bus/get-all-stops-file/')
        self.assertEqual(len(response.data), 4310)


    def test_all_routes(self):
        response = self.client.get('/api/bus/get-all-routes-file/')
        self.assertEqual( len(response.data), 210)


    def test_all_upcoming_stoptimes(self):
        data = {"stopId": "8220DB000024", "time": "12:00:00"}
        response = self.client.get('/api/bus/upcoming-stoptimes/', data, format='json')
        self.assertEqual(response.status_code, 200)


    def test_all_get_ml_predict_least_data(self):
        res1 = self.client.get('/api/bus/get-ml-predict/', self.small_data_stop_1, format='json')
        res2 = self.client.get('/api/bus/get-ml-predict/', self.small_data_stop_2, format='json')
        res3 = self.client.get('/api/bus/get-ml-predict/', self.small_data_stop_3, format='json')
        res4 = self.client.get('/api/bus/get-ml-predict/', self.small_data_stop_4, format='json')
        res5 = self.client.get('/api/bus/get-ml-predict/', self.small_data_stop_5, format='json')

        maxRes = max(res1.data, res2.data, res3.data, res4.data, res5.data)
        minRes = min(res1.data, res2.data, res3.data, res4.data, res5.data)

        maxDiff = abs(15-maxRes)
        minDiff = abs(15-minRes)
        difference = max(maxDiff, minDiff)

        self.assertGreaterEqual(9, difference)


    def test_all_get_ml_predict_most_data(self):
        res1 = self.client.get('/api/bus/get-ml-predict/', self.large_data_stop_1, format='json')
        res2 = self.client.get('/api/bus/get-ml-predict/', self.large_data_stop_2, format='json')
        res3 = self.client.get('/api/bus/get-ml-predict/', self.large_data_stop_3, format='json')
        res4 = self.client.get('/api/bus/get-ml-predict/', self.large_data_stop_4, format='json')
        res5 = self.client.get('/api/bus/get-ml-predict/', self.large_data_stop_5, format='json')

        maxRes = max(res1.data, res2.data, res3.data, res4.data, res5.data)
        minRes = min(res1.data, res2.data, res3.data, res4.data, res5.data)

        maxDiff = abs(15-maxRes)
        minDiff = abs(15-minRes)
        difference = max(maxDiff, minDiff)
        
        self.assertGreaterEqual(7, difference)


