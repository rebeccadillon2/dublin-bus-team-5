from rest_framework.test import APITestCase

class TestSetUp(APITestCase):
    def setUp(self):
        self.valid_reigster_data = {
            "email": "eoin25@email.com",
            "username":  "eoin25@email.com",
            "password": "pass",
            "password_confirmation": "pass"
            }

        self.invalid_register_data = {
            "email": "eoin25@email.com",
            "username":  "eoin25@email.com",
            "password": "pass",
            "password_confirmation": "passmatch"
            }

        self.valid_login_data = {
            "email":  "eoin25@email.com",
            "password": "pass",
            }

        self.invalid_login_data = {
            "email":  "eoin25@email.com",
            "password": "passt",
            }
        
        return super().setUp()

    def tearDown(self):
        return super().tearDown()