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


