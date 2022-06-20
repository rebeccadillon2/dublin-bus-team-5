from django.urls import path
from .views import BlogDetialView, BlogListView 

urlpatterns = [
    path('', BlogListView.as_view()),
    path('<int:pk>/', BlogDetialView.as_view()),
]
