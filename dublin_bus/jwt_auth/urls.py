from django.urls import path
from .views import (
    LoginView,
    ProfileView,
    UserListView,
    RegisterView,
    ProfileEditView
)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/<int:pk>/edit/', ProfileEditView.as_view()),
    path('profile/<int:user_pk>/', ProfileView.as_view()),
    path('profile/all/', UserListView.as_view())
]
