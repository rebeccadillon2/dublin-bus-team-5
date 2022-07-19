from django.shortcuts import render
import joblib
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import RouteSign, StopTimes, StopTimesRoutes, Stop, Trip, Route
from .serializers import BasicStopTimesRoutesSerializer, BasicStopsSerializer, StopSerializer, BasicRouteStopsSingleDirectionsSerializer, BasicRoutesWithHeadSignSerializer, BasicRoutesSignSerializer, RouteSignSerializer
from django.db.models import Q
from django.core import serializers
import json

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
        print('TID', tripId)
        stops = StopTimes.objects.filter(trip_id=tripId).values('stop_id', 'stop_id__stop_lat', 'stop_id__stop_lon', 'stop_id__stop_name', 'progress_num')
        print('COUNT', stops.count())
        serializedStops = BasicRouteStopsSingleDirectionsSerializer(stops, many=True)
        return Response(serializedStops.data, status=status.HTTP_200_OK)

class RouteDirectionStopCountView(APIView):

    def get(self, request):
        routeId= request.GET['routeId']
        headSign= request.GET['headSign']
        tripId = Trip.objects.filter(Q(route_id_id=routeId) & Q(headsign=headSign))[0].trip_id
        stops = StopTimes.objects.filter(trip_id_id=tripId).values('stop_id', 'stop_id__stop_lat', 'stop_id__stop_lon', 'stop_id__stop_name', 'progress_num')
        return Response(stops.count(), status=status.HTTP_200_OK)


class AllRoutesWithHeadSignView(APIView):

    def get(self, request):
        routes = Trip.objects.filter().values('route_id', 'route_id__route_short_name','headsign').distinct().order_by('route_id__route_short_name')
        print('COUNT', routes.count())
        serializedRoutes = BasicRoutesWithHeadSignSerializer(routes, many=True)
        return Response(serializedRoutes.data, status=status.HTTP_200_OK)



class MLPredictionView(APIView):
    '''ML Prediction View for ML routes'''

    def get(self, request):
        # features = request.GET['features']
        # file = request.GET['file']

        filename = '/Users/eoinbarr/Desktop/UCD/dublin-bus-team-5/data/modelling/randomforest/joblibfiles/line_27_model/dir1/line_27_rfr.joblib' 
        model = joblib.load(filename) 
        res = model.predict([[75,5.1,19800,1,21]])
        print('RES', res)        
        return Response({}, status=status.HTTP_200_OK)
