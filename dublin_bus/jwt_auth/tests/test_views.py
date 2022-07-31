from .test_setup import TestSetUp

class TestViews(TestSetUp):    
    def test_user_can_register(self):
        data = {
 	        "email": "eoin25@email.com",
 	        "username":  "eoin25@email.com",
 	        "password": "pass",
 	        "password_confirmation": "pass"
            }
        res = self.client.post("/api/auth/register/", data, format='json')
        self.assertEqual(res.status_code, 201)
    
    def test_user_cannot_register_no_data(self):
        res = self.client.post("/api/auth/register/")
        self.assertEqual(res.status_code, 422)

    def test_user_cannot_register_non_matching_password(self):
        data = {
            "email": "eoin25@email.com",
            "username":  "eoin25@email.com",
            "password": "pass",
            "password_confirmation": "passmatch"
            }
        res = self.client.post("/api/auth/register/", data, format='json')
        self.assertEqual(res.status_code, 422)