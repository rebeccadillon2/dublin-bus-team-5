from email.policy import default
from django.db import models


# Table has been formed to enable able fast acces between stops, stop times and route names.
class StopTimesRoutes(models.Model):
    id = models.IntegerField(primary_key=True)
    trip_id = models.CharField(max_length=50)
    arrival_time = models.CharField(max_length=50)
    stop_id = models.CharField(max_length=100)
    stop_sequence = models.IntegerField()
    stop_headsign = models.CharField(max_length=50)
    shape_dist_traveled = models.CharField(max_length=50)
    route_id = models.CharField(max_length=50)
    route_short_name = models.CharField(max_length=50)
    direction_id = models.IntegerField()

    class Meta:
        db_table = 'stoptimes_routes'


# Table has been formed to show all routes and allow users to save routes
class RouteSign(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    route_id = models.CharField( max_length=50)
    route_short_name = models.CharField(max_length=50)
    headsign = models.CharField(max_length=100)
    favourited_by = models.ManyToManyField(
        'jwt_auth.User',
        related_name='favourited_routes',
        blank=True
    )

    class Meta:
        db_table = 'routes_sign'


# Table has been formed to show all stops and allow users to save stops
class Stop(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    stop_name = models.CharField(max_length=200)
    stop_lat = models.FloatField(max_length=100)
    stop_lon = models.FloatField(max_length=100)
    favourited_by = models.ManyToManyField(
        'jwt_auth.User',
        related_name='favourited_stops',
        blank=True
    )

    class Meta:
        db_table = 'stops'

# Table has been formed to to ebable routes to be associated with trips
class Route(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    route_short_name = models.CharField(max_length=50)

    class Meta:
        db_table = 'routes'


# Table has been formed to to get all trips
class Trip(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    route_id = models.ForeignKey(Route, on_delete=models.CASCADE)
    trip_id = models.CharField(max_length=255, default=0)
    headsign = models.CharField(max_length=50,  default=0)
    direction = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'trips'


# Table has been formed to to get all stoptimes
class StopTimes(models.Model):
    id = models.IntegerField(primary_key=True)
    trip_id = models.CharField(max_length=50)
    arrival_time = models.TimeField()
    stop_id = models.ForeignKey(Stop, on_delete=models.CASCADE)
    progress_num = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'stop_times'


# Table has been formed to model trips and stops
class TripsStops(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    stop = models.ForeignKey(Stop, on_delete=models.CASCADE)
    progress_num = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'trips_stops'

# Table has been formed to to get all trips
class Tripnew(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    route_id = models.ForeignKey(Route, on_delete=models.CASCADE)
    trip_id = models.CharField(max_length=255, default=0)
    headsign = models.CharField(max_length=250,  default=0)
    direction = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'tripsnew'


# Table has been formed to to get all trips
class Tripnewnew(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    route_id = models.ForeignKey(Route, on_delete=models.CASCADE)
    trip_id = models.CharField(max_length=255, default=0)
    headsign = models.CharField(max_length=255,  default=0)
    direction = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'tripsnewnew'