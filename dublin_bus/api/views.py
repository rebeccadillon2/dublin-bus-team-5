from django.shortcuts import render
import joblib
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import RouteSign, StopTimes, StopTimesRoutes, Stop, Trip, Route, Tripnewnew
from .serializers import BasicStopTimesRoutesSerializer, BasicStopsSerializer, StopSerializer, BasicRouteStopsSingleDirectionsSerializer, BasicRoutesWithHeadSignSerializer, BasicRoutesSignSerializer, RouteSignSerializer
from django.db.models import Q
from django.core import serializers
import json
import os
import pickle
import math
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


class UpcomingStopTimesRoutes(APIView):
    def get(self, request):
        stopId = request.GET['stopId']
        time = request.GET['time']

        filteredStopTimeRoutes = StopTimesRoutes.objects.filter(stop_id=stopId, arrival_time__gt=time).order_by('arrival_time')[:5]
        serializedStopTimeRoutes = BasicStopTimesRoutesSerializer(filteredStopTimeRoutes, many=True)
        return Response(serializedStopTimeRoutes.data, status=status.HTTP_200_OK)


class AllStopsView(APIView):

    def get(self, request):
        stops = Stop.objects.all()
        serializedStops = BasicStopsSerializer(stops, many=True)
        return Response(serializedStops.data, status=status.HTTP_200_OK)

class AllStopsFileView(APIView):
    def get(self, request):
        with open('/Users/eoinbarr/Desktop/UCD/dublin-bus-team-5/dublin_bus/api/all_stops.json', 'r') as f:
            stops = json.load(f)
        return Response(stops, status=status.HTTP_200_OK)


class AllRoutesFileView(APIView):
    def get(self, request):
        with open('/Users/eoinbarr/Desktop/UCD/dublin-bus-team-5/dublin_bus/api/all_routes.json', 'r') as f:
            routes = json.load(f)
        return Response(routes, status=status.HTTP_200_OK)


class AllRoutesView(APIView):

    def get(self, request):
        routes = RouteSign.objects.all()
        serializedRoutes = BasicRoutesSignSerializer(routes, many=True)
        return Response(serializedRoutes.data, status=status.HTTP_200_OK)


class StopFavouriteView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, stop_pk, user_id):

        try: 
            stopToFavourite = Stop.objects.get(id=stop_pk)
        except Stop.DoesNotExist:
            raise NotFound()
        if request.user in stopToFavourite.favourited_by.all():
            stopToFavourite.favourited_by.remove(user_id)
        else:
            stopToFavourite.favourited_by.add(user_id)
        serializedStop = StopSerializer(stopToFavourite)
        return Response(serializedStop.data, status=status.HTTP_200_OK)


class RouteSignFavouriteView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, route_pk, head_sign, user_id):
        print(route_pk, user_id, head_sign)
        try: 
            routeToFavourite = RouteSign.objects.get(route_id=route_pk, headsign=head_sign)
        except RouteSign.DoesNotExist:
            raise NotFound()
        if request.user in routeToFavourite.favourited_by.all():
            routeToFavourite.favourited_by.remove(user_id)
        else:
            routeToFavourite.favourited_by.add(user_id)
        serializedRoute = RouteSignSerializer(routeToFavourite)
        return Response(serializedRoute.data, status=status.HTTP_200_OK)


class RouteStopsSingleDirectionsView(APIView):

    def get(self, request):
        routeId= request.GET['routeId']
        headSign= request.GET['headSign']
        tripId = Trip.objects.filter(Q(route_id_id=routeId) & Q(headsign=headSign))[0].trip_id
        stops = StopTimes.objects.filter(trip_id=tripId).values('stop_id', 'stop_id__stop_lat', 'stop_id__stop_lon', 'stop_id__stop_name', 'progress_num')
        serializedStops = BasicRouteStopsSingleDirectionsSerializer(stops, many=True)
        return Response(serializedStops.data, status=status.HTTP_200_OK)

class RouteDirectionStopCountView(APIView):

    def get(self, request):
        routeId= request.GET['routeId']
        headSign= request.GET['headSign']
        tripId = Trip.objects.filter(Q(route_id_id=routeId) & Q(headsign=headSign))[0].trip_id
        stops = StopTimes.objects.filter(trip_id=tripId).values('stop_id', 'stop_id__stop_lat', 'stop_id__stop_lon', 'stop_id__stop_name', 'progress_num')
        return Response(stops.count(), status=status.HTTP_200_OK)


class AllRoutesWithHeadSignView(APIView):

    def get(self, request):
        routes = Trip.objects.filter().values('route_id', 'route_id__route_short_name','headsign').distinct().order_by('route_id__route_short_name')
        serializedRoutes = BasicRoutesWithHeadSignSerializer(routes, many=True)
        return Response(serializedRoutes.data, status=status.HTTP_200_OK)



class MLPredictionView(APIView):
    def get(self, request):
        numStops = request.GET['numStops']
        headSign = request.GET['headSign']
        routeHeadSign = request.GET['routeHeadSign']
        routeShortName = request.GET['routeShortName']
        direction = Tripnewnew.objects.filter(headsign = headSign)[0].direction
        directory = 'dir2' if direction == 1 else 'dir1'

        with open('/Users/eoinbarr/Desktop/UCD/dublin-bus-team-5/dublin_bus/api/directions.json', 'r') as f:
            dictDirs = json.load(f)
        try:
            numberOfStops = dictDirs[f'60-{routeShortName}-d12-1'][f' {routeHeadSign}']
        except:
            numberOfStops = dictDirs[f'60-{routeShortName}-b12-1'][f' {routeHeadSign}']
            
                
        humidity = request.GET['humidity']
        wind = request.GET['wind']
        seconds = request.GET['seconds']
        day = request.GET['day']
        month = request.GET['month']

        filename = f'/Users/eoinbarr/Desktop/UCD/dublin-bus-team-5/machinelearning/data/modelling/randomforest/picklefiles/line_{routeShortName}_model/{directory}/line_{routeShortName}_rfr.pkl' 
        model = pickle.load(open(filename, 'rb')) 
        rush_hour = 1 if 0<= int(day) <= 4 and (25200 <= int(seconds) <= 32400 or 54000 <= int(seconds) <= 61200) else 0
        print('rush_hour', rush_hour)
        res = model.predict([[int(seconds), int(rush_hour), int(humidity),float(wind),int(day),int(month)]])

        return Response(math.floor((float(res[0])/60) * (int(numStops)/int(numberOfStops))), status=status.HTTP_200_OK)


class MLPredictView(APIView):
    def get(self, request):
        numStops = request.GET['numStops']
        headSign = request.GET['headSign']
        routeHeadSign = request.GET['routeHeadSign']
        routeShortName = request.GET['routeShortName']
        try:
            direction = Tripnewnew.objects.filter(headsign = headSign)[0].direction
        except:
            direction = 1
        directory = 'dir2' if direction == 1 else 'dir1'

        with open('/Users/eoinbarr/Desktop/UCD/dublin-bus-team-5/dublin_bus/api/directions.json', 'r') as f:
            dictDirs = json.load(f)
        try:
            numberOfStops = dictDirs[f'60-{routeShortName}-d12-1'][f' {routeHeadSign}']
        except:
            numberOfStops = dictDirs[f'60-{routeShortName}-b12-1'][f' {routeHeadSign}']
            
                
        humidity = request.GET['humidity']
        wind = request.GET['wind']
        seconds = request.GET['seconds']
        day = request.GET['day']
        month = request.GET['month']

        filename = f'/Users/eoinbarr/Desktop/UCD/dublin-bus-team-5/machinelearning/data/modelling/randomforest/picklefiles/line_{routeShortName}_model/{directory}/line_{routeShortName}_rfr.pkl' 
        model = pickle.load(open(filename, 'rb')) 
        rush_hour = 1 if 0<= int(day) <= 4 and (25200 <= int(seconds) <= 32400 or 54000 <= int(seconds) <= 61200) else 0
        print('rush_hour', rush_hour)
        res = model.predict([[int(seconds), int(rush_hour), int(humidity),float(wind),int(day),int(month)]])
        
        return Response(math.floor((float(res[0])/60) * (int(numStops)/int(numberOfStops))), status=status.HTTP_200_OK)

