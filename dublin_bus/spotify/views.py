import json
import traceback
from .util import *
from os import access
from email.policy import HTTP
from rest_framework import status
from requests import Request, post, get
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render, redirect
from django.http.response import HttpResponse
from django.http import HttpResponseBadRequest
from .constants import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, CALLBACK, dublin_postcast_ids


globalUID = 0


# Code inspiration from https://github.com/techwithtim/Music-Controller-Web-App-Tutorial

# Function which gets the authorization url for a user to authenticate with Spotify
class AuthUrl(APIView):
    def get(self, request, format=None):
        global globalUID
        globalUID = request.user.id
        # Getting the relevant scopes to allow desired functionality
        scopes = 'user-read-currently-playing  user-library-read  user-library-modify user-follow-modify streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state'
        url = Request('GET', 'https://accounts.spotify.com/authorize', 
        params={'scope':scopes, 'response_type':'code', 'redirect_uri':CALLBACK, 'client_id':CLIENT_ID, 'user_id':request.user.id}).prepare().url 
        return Response({'url':url}, status=status.HTTP_200_OK) 

# Callback function
def spotify_callback(request):
    # Getting the code from the callback
    code = request.GET.get('code') 
    error = request.GET.get('error') 

    # Making teh request to get the access token
    response = post('https://accounts.spotify.com/api/token',  data={
        'grant_type':'authorization_code',
        'code':code,
        'redirect_uri':CALLBACK,
        'client_id':CLIENT_ID,
        'client_secret':CLIENT_SECRET
    }).json() 

    access_token = response.get('access_token') 
    token_type = response.get('token_type') 
    refresh_token = response.get('refresh_token') 
    expires_in = response.get('expires_in')
    error = response.get('error') 

    # Updating or creating a user's tokens
    update_or_create_user_tokens(globalUID, access_token, token_type, expires_in, refresh_token)
    # Returning the user to the redirect uri
    return redirect(REDIRECT_URI)


# Function which checks if a user is authenticated
class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(self.request.user.id)
        return Response({'status':is_authenticated}, status=status.HTTP_200_OK)


# Function which retrieces the current song playing on Spotify
class CurrentSong(APIView):
    def get(self,request,format=None):
        endpoint = "player/current-playing?market=ES"
        res = execute_spotify_api_request(self.request.user.id,endpoint)
        try:
            current_song = parse_current_song(res)
        except:
            current_song = {}
        print(current_song)
        return Response({'current_song':current_song}, status=status.HTTP_200_OK)


# Function which retrieves the dublin podcasts specified in constants.py
class GetDublinPodcasts(APIView):
    def get(self, request):
        dublin_podcasts = []
        access_token = get_user_tokens(request.user.id).access_token
        for id in dublin_postcast_ids:
            podcast_info = get_podcast_info(id, access_token)
            dublin_podcasts.append(podcast_info)
        return Response({'podcasts': dublin_podcasts}, status=status.HTTP_200_OK)


# Function which retrieves the episodes of the dublin podcasts specified in constants.py
class GetDublinPodcastEpisodes(APIView):
    def get(self, request):
        show_id = request.GET['id']
        uid = request.GET['uid']
        access_token = get_user_tokens(uid).access_token
        eps = get_podcast_episodes(show_id, access_token)
        return Response({'episodes':eps}, status=status.HTTP_200_OK)


# Function which plays the track specified in the request
class PlayTrack(APIView):
    def get(self, request):
        uri = request.GET['uri']
        uid = request.GET['uid']
        print('self', request.user.id)
        play_track(uri, get_user_tokens(uid).access_token)
        return HttpResponse(json.dumps({'success':True}))


# Function which pauses the track specified in the request
class PauseTrack(APIView):
    def get(self, request):
        uid = request.GET['uid']
        is_spotify_authenticated(uid)
        execute_spotify_api_request(uid, 'player/pause', put_=True)
        return Response({'success':True}, status=status.HTTP_200_OK)


# Function which gets the access token for the user
class GetAccessToken(APIView):
    def get(self, request):
        uid = request.GET['uid']
        print('HERE')
        try:
            is_spotify_authenticated(uid)
            access_token = get_user_tokens(uid).access_token
            print('at', access_token)
            return Response({'access_token': access_token}, status=status.HTTP_200_OK)
        except:
            traceback.print_exc()
            return HttpResponseBadRequest(json.dumps({'error': 'Unable to authenticate Spotify'} ))


class GetArtistInfo(APIView):
    def get(self, request):
        uid = request.GET['uid']
        artist_name = request.get['artistName']
        try:
            is_spotify_authenticated(uid)
            access_token = get_user_tokens(uid).access_token
            url = create_url(artist_name)
            artist = run_search(url, artist_name,  access_token)
            top_songs = get_artist_top_songs(artist[1], access_token)
        except:
            top_songs = []
        
        return HttpResponse(json.dumps({'songs':top_songs}))