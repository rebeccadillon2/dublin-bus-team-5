from django.urls import path
from .views import * 

app_name='frontend'

urlpatterns = [
     # django url bacend
    path("add/", add_content),
    path("get/all/", get_all_content),
    path('get/<str:email>/', get_content),
    path('del/<int:id>/', delete_one),
    path("update/", update_one),

    # react page
    path('', index, name='index'),
    path("events/", index, name="events"),
    path("account/", index, name="account"),
    path("wordle/", index, name="wordle"),
]