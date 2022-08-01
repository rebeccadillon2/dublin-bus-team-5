from .test_setup import TestSetUp
from ..models import User

class TestViews(TestSetUp):    
    def test_register_sucess(self): 
        res = self.client.post("/api/auth/register/", self.valid_reigster_data, format='json')
        self.assertEqual(res.status_code, 201)
    

    def test_register_fail_no_data(self):
        res = self.client.post("/api/auth/register/")
        self.assertEqual(res.status_code, 422)


    def test_register_fail_non_matching_password(self):
        res = self.client.post("/api/auth/register/", self.invalid_register_data, format='json')
        self.assertEqual(res.status_code, 422)


    def test_login_fail_non_existing_email_password_combination(self):
        response = self.client.post("/api/auth/register/", self.valid_reigster_data, format='json')
        res = self.client.post("/api/auth/login/", self.invalid_login_data, format='json')
        user = User.objects.get(email="eoin25@email.com")
        user.save()
        self.assertEqual(res.status_code, 403)


    def test_login_success(self):
        response = self.client.post("/api/auth/register/", self.valid_reigster_data, format='json')
        user = User.objects.get(email="eoin25@email.com")
        user.save()
        res = self.client.post("/api/auth/login/", self.valid_login_data, format='json')
        self.assertEqual(res.status_code, 200)