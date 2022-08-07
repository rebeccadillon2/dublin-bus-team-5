from django.urls import path
from .views import MLPredictionView, UpcomingStopTimesRoutes, AllStopsView, StopFavouriteView, RouteStopsSingleDirectionsView, AllRoutesView, RouteDirectionStopCountView, RouteSignFavouriteView, MLPredictView, AllStopsFileView, AllRoutesFileView

urlpatterns = [
    path('get-all-stops/', AllStopsView.as_view()),
    path('get-all-stops-file/', AllStopsFileView.as_view()),
    path('get-all-routes-file/', AllRoutesFileView.as_view()),
    path('get-all-routes/', AllRoutesView.as_view()),
    path('get-ml-predict/', MLPredictView.as_view()),
    path('get-ml-prediction/', MLPredictionView.as_view()),
    path('upcoming-stoptimes/', UpcomingStopTimesRoutes.as_view()),
    path('get-route-stops-single/', RouteStopsSingleDirectionsView.as_view()),
    path('get-route-direction-stop-count/', RouteDirectionStopCountView.as_view()),
    path('favourite-stop/<str:stop_pk>/<str:user_id>/', StopFavouriteView.as_view()),
    path('favourite-route/<str:route_pk>/<str:head_sign>/<str:user_id>/', RouteSignFavouriteView.as_view()),
]