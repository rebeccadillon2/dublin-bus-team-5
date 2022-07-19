from asyncore import read
from pyexpat import model
from tracemalloc import stop
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import RouteSign, StopTimes, StopTimesRoutes, Stop, Trip

User = get_user_model()


class BasicStopTimesRoutesSerializer(serializers.ModelSerializer):

    class Meta:
        model = StopTimesRoutes
        fields = '__all__'


class BasicStopsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stop
        fields = ('id', 'stop_name', 'stop_lat', 'stop_lon')


class BasicRoutesSignSerializer(serializers.ModelSerializer):

    class Meta:
        model = RouteSign
        fields = ('id',  'route_id', 'route_short_name', 'headsign')


class BasicTripsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = '__all__'


class NestedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class StopSerializer(serializers.ModelSerializer):
    favourited_by = NestedUserSerializer(many=True, read_only=True)

    class Meta:
        model = Stop
        fields = '__all__'


class RouteSignSerializer(serializers.ModelSerializer):
    favourited_by = NestedUserSerializer(many=True, read_only=True)

    class Meta:
        model = RouteSign
        fields = '__all__'

class StopLatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stop
        fields = ('stop_lat')


class BasicRouteStopsSingleDirectionsSerializer(serializers.Serializer):
    stop_id = serializers.CharField(max_length=100)
    stop_id__stop_lat = serializers.FloatField()
    stop_id__stop_lon = serializers.FloatField()
    stop_id__stop_name = serializers.CharField(max_length=100)
    progress_num = serializers.IntegerField()


class BasicRoutesWithHeadSignSerializer(serializers.Serializer):
    route_id = serializers.CharField(max_length=100)
    route_id__route_short_name = serializers.CharField(max_length=100)
    headsign = serializers.CharField(max_length=100)