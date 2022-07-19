from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(max_length=50, unique=True)
    profile_image = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return f'{self.email}'