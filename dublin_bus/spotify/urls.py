from django.urls import path
from .views import *

urlpatterns = [
    path('redirect/', spotify_callback),
    path('get-auth-url/', AuthUrl.as_view()),
    path('play-track/', PlayTrack.as_view()),
    path('pause-track/', PauseTrack.as_view()),
    path('current-song/', CurrentSong.as_view()),
    path('get-artist-info/', GetArtistInfo.as_view()),
    path('get-access-token/', GetAccessToken.as_view()),
    path('get-podcasts/', GetDublinPodcasts.as_view()),
    path('is-authenticated/', IsAuthenticated.as_view()),
    path('get-podcast-episodes/', GetDublinPodcastEpisodes.as_view()),
]