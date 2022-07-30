from django.test import TestCase
from .views import GetSingleStop
import json
# Create your tests here.
class JourneyPlanningTests(TestCase):
    
    def test_get_single_stop(self):
        res = self.client.get('/get-single-stop/8250DB000768/')
        self.assertEqual(res.status_code, 200)

    def test_get_single_route(self):
        res = self.client.get('/get-single-route/60-46A-d12-1/')
        print("RES", res)
        self.assertEqual(res.status_code, 200)
    