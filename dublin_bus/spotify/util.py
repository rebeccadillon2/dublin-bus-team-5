from datetime import timedelta
from django.utils import timezone
import datetime
from .models import SpotifyToken
from requests import post, put, get
from .constants import CLIENT_ID, CLIENT_SECRET, BASE_URL
import requests
import json

# Code inspiration from https://github.com/techwithtim/Music-Controller-Web-App-Tutorial

# Function that retrieves a users tokens
def get_user_tokens(user_id):
    print('inside get_user_tokens', user_id)
    user_tokens = SpotifyToken.objects.filter(user=int(user_id))
    # If tokens exist, return the first one
    if user_tokens.exists():
        print('returning tokens')
        return user_tokens[0]
    else:
        # If no tokens exist, return None
        print('NOT returning tokens')
        return None


# Function that updates or creates a user's tokens
def update_or_create_user_tokens(user_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(user_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)
    # If tokens exist, they are set
    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
    else: 
        tokens = SpotifyToken(user=int(user_id), access_token=access_token, refresh_token=refresh_token, expires_in=expires_in, token_type=token_type)
        tokens.save()


# Function that checks if Spotify is authenticated
def is_spotify_authenticated(user_id):
    # Retreiving a user's tokens
    tokens = get_user_tokens(user_id)
    # If tokens exist and they are not expired retieve a refresh token and return true
    if tokens:
        expiry = tokens.expires_in   
        if expiry <= timezone.now():
            refresh_spotify_token(user_id)
        return True
    return False


# Function that refreshes a user's tokens
def refresh_spotify_token(user_id):
    # Makign a request to  refresh a user's tokens
    refresh_token = get_user_tokens(user_id).refresh_token
    # Making the request
    res = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()
    # Assigning the new tokens
    access_token = res.get('access_token')
    token_type = res.get('token_type')
    expires_in = res.get('expires_in')
    refresh_token = res.get('refresh_token')
    # Updating a user's tokens
    update_or_create_user_tokens(user_id,  access_token, token_type, expires_in, refresh_token)


# Function that streamlines making a request to the Spotify API
def execute_spotify_api_request(user_id, endpoint, post_=False, put_=False):
    tokens = get_user_tokens(user_id)
    headers = {'Content-Type':'application/json', 'Authorization': 'Bearer ' + tokens.access_token}
    if post_:
        post(BASE_URL + endpoint, headers=headers)
    if put_:
        put(BASE_URL + endpoint, headers=headers)
    res = get(BASE_URL + endpoint, {}, headers=headers)
    try:
        return res.json()
    except:
        return {'Error': 'Issue with request'}


# Function that parses the current song
def parse_current_song(song):
    parsed_song = {}  
    name = song['item']['name']
    image = song['item']['album']['images'][0]['url']
    artist = song['item']['album']['artists'][0]['name']  

    parsed_song['name'] = name 
    parsed_song['image'] = image 
    parsed_song['artist'] = artist  
    return parsed_song


# Function that retrieves information regarding a podcast
def get_podcast_info(podcast_id, access_token):
    # Creating the headers
    headers = {'Content-Type': 'application/json', 'Authorization':'Bearer ' + access_token}
    # Constructing the endpoint
    endpoint = f'https://api.spotify.com/v1/shows/{podcast_id}'
    # Making the request
    res = get(endpoint, headers=headers).json()
    # Returning the response
    return {'id':podcast_id, 'name':res['name'], 'image':res['images'][-1]['url']}


# Function that retrieves episodes regarding a podcast
def get_podcast_episodes(podcast_id, access_token):
    # Creating the headers
    header = {'Content-Type':'application/json', 'Authorization':"Bearer " + access_token}
    # Constructing the endpoint
    endpoint = "https://api.spotify.com/v1/shows/{0}/episodes".format(podcast_id) 
    # Making the request
    data = get(endpoint, headers=header).json()  
    # Returning the response
    return list(map(lambda x: {'id':x['id'], 'duration_ms':x['duration_ms'], 'name':x['name'], 'uri':x['uri'],'image':x['images'][-1]['url']}, data['items']))


# Function that plays the current track
def play_track(uri, access_token):
    # Creating the headers
    header = {'Content-Type':'application/json', 'Authorization':"Bearer " + access_token}
    # Constructing the endpoint
    endpoint = "https://api.spotify.com/v1/me/player/play" 
    data = {"uris":[uri]}  
    print('URI', uri)
    # Making the request
    requests.put(endpoint, data=json.dumps(data), headers=header)  