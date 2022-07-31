from rest_framework.test import APITestCase
from django.urls import reverse

class TestSetUp(APITestCase):
    def setUp(self):
        self.register_url=reverse('register')
        self.register_url=reverse('login')

        self.user_data = {
            "username": "a@email.com",
            "email": "a@email.com",
            "password": "a@email.com",
            "passwordConfirmation": "a@email.com",
            "profileImage":
                        "https://res.cloudinary.com/dn11uqgux/image/upload/v1631736676/sei_project_3_studio_images/Screenshot_2021-09-15_at_21.09.58_vd6hdq.png",
  };
        
        return super().setUp()

    def tearDown(self):
        return super().tearDown()