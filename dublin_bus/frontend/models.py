from django.db import models

# Create your models here.

class Content(models.Model):
    email = models.EmailField(max_length=50)
    content = models.TextField()
    reply = models.TextField()
    creat_time = models.TextField(default='')
    reply_time = models.TextField(default='')
    reply_email = models.TextField(default='')