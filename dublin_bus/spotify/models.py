from django.db import models

# Spotify Token Model
class SpotifyToken(models.Model):
    user = models.IntegerField(unique=True)
    access_token = models.CharField(max_length=300)
    refresh_token = models.CharField(max_length=300)
    expires_in = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    token_type = models.CharField(max_length=100)