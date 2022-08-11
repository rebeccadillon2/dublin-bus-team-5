from rest_framework.test import APITestCase

class TestSetUp(APITestCase):
    def setUp(self):
        self.large_data_stop_1 = {
            "headSign": "Outside Heuston Train Station - Ballywaltrim", 
            "routeShortName": "145",
            "humidity": 84,
            "wind": 9.77,
            "seconds": 43400,
            "day": 0,
            "month": 8,
            "routeHeadSign": "Heuston Station",
            "numStops": 15
        }

        self.large_data_stop_2 = {
            "headSign": "Outside Heuston Train Station - Ballywaltrim", 
            "routeShortName": "145",
            "humidity": 84,
            "wind": 9.77,
            "seconds": 45400,
            "day": 0,
            "month": 9,
            "routeHeadSign": "Heuston Station",
            "numStops": 15
        }

        self.large_data_stop_3 = {
            "headSign": "Outside Heuston Train Station - Ballywaltrim", 
            "routeShortName": "145",
            "humidity": 84,
            "wind": 9.77,
            "seconds": 47400,
            "day": 0,
            "month": 10,
            "routeHeadSign": "Heuston Station",
            "numStops": 15
        }

        self.large_data_stop_4 = {
            "headSign": "Outside Heuston Train Station - Ballywaltrim", 
            "routeShortName": "145",
            "humidity": 84,
            "wind": 9.77,
            "seconds": 49400,
            "day": 0,
            "month": 11,
            "routeHeadSign": "Heuston Station",
            "numStops": 15
        }

        self.large_data_stop_5 = {
            "headSign": "Outside Heuston Train Station - Ballywaltrim", 
            "routeShortName": "145",
            "humidity": 84,
            "wind": 9.77,
            "seconds": 54000,
            "day": 0,
            "month": 12,
            "routeHeadSign": "Heuston Station",
            "numStops": 15
        }

        self.small_data_stop_1 = {
            "headSign": "Saint Pappin's Road - Blackthorn Drive (Blackthorn Road)", 
            "routeShortName": "11",
            "humidity": 84,
            "wind": 9.77,
            "seconds": 43400,
            "day": 0,
            "month": 8,
            "routeHeadSign": "St Pappin's Rd",
            "numStops": 18
        }

        self.small_data_stop_2 = {
            "headSign": "Saint Pappin's Road - Blackthorn Drive (Blackthorn Road)", 
            "routeShortName": "11",
            "humidity": 84,
            "wind": 9.77,
            "seconds": 45400,
            "day": 0,
            "month": 9,
            "routeHeadSign": "St Pappin's Rd",
            "numStops": 18
        }

        self.small_data_stop_3 = {
            "headSign": "Saint Pappin's Road - Blackthorn Drive (Blackthorn Road)", 
            "routeShortName": "11",
            "humidity": 84,
            "wind": 9.77,
            "seconds": 47400,
            "day": 0,
            "month": 10,
            "routeHeadSign": "St Pappin's Rd",
            "numStops": 18
        }

        self.small_data_stop_4 = {
            "headSign": "Saint Pappin's Road - Blackthorn Drive (Blackthorn Road)", 
            "routeShortName": "11",
            "humidity": 84,
            "wind": 9.77,
            "seconds": 49400,
            "day": 0,
            "month": 11,
            "routeHeadSign": "St Pappin's Rd",
            "numStops": 18
        }

        self.small_data_stop_5 = {
            "headSign": "Saint Pappin's Road - Blackthorn Drive (Blackthorn Road)", 
            "routeShortName": "11",
            "humidity": 84,
            "wind": 9.77,
            "seconds": 54000,
            "day": 0,
            "month": 12,
            "routeHeadSign": "St Pappin's Rd",
            "numStops": 18
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()