from datetime import datetime, timedelta
from inspect import currentframe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.generics import UpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers import (
    UserUpdateSerializer,
    BasicProfileSerializer,
    UserRegisterSerializer,
)

User = get_user_model()


class RegisterView(APIView):

    # Function that registers a new user
    def post(self, request):
        user_to_create = UserRegisterSerializer(data=request.data)
        # If user is valid a new user is saved to the database
        if user_to_create.is_valid():
            user_to_create.save()
            return Response(
                {'message': 'Registration Successful'},
                status=status.HTTP_201_CREATED
            )
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    # Function that logs in a user
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        # Attemps to find a user with the given email
        try:
            user_to_login = User.objects.get(email=email)
        # If the user does not exist, raise an error
        except User.DoesNotExist:
            raise PermissionDenied(detail='Unauthorized')
        # If the passowrd does not match, raise an error
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail='Unauthorized')
        # Setting an expiry time of one week
        expiry_time = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user_to_login.id,
            'exp': int(expiry_time.strftime('%s'))
            },
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        # Returning a response with the token
        return Response({
            'token': token,
            'message': f'Welcome back, {email}!'
        }, status=status.HTTP_200_OK)


class UserListView(APIView):
    permission_classes = (IsAuthenticated, )

    # Function that returns a list of all users (testing purposes)
    def get(self, _request):
        users = User.objects.all()
        serialized_user = BasicProfileSerializer(users, many=True)
        return Response(serialized_user.data, status=status.HTTP_200_OK)


class ProfileUpdateView(RetrieveUpdateDestroyAPIView):
    # Function that updates a user's profile if they are authenticated
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = (IsAuthenticated, )


class ProfileEditView(APIView):
    # Function that edits a user's profile if they are authenticated
    permission_classes = (IsAuthenticated, )

    def put(self, request, **kwargs):
        id = kwargs['pk']
        # Finding the user with the provided id
        current_user = User.objects.get(id=request.user.id)
        edited_current_user = UserUpdateSerializer(
            current_user, data=request.data)
        # Checking if the edit made was valid 
        if edited_current_user.is_valid():
            edited_current_user.save()
            return Response(edited_current_user.data, status=status.HTTP_202_ACCEPTED)
        # If the edit was not valid, return 422
        return Response(edited_current_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ProfileView(APIView):
    # Function that gets a user's profile if they are authenticated
    permission_classes = (IsAuthenticated, )


    def get(self, _request, user_pk):
        try:
            user_to_show = User.objects.get(pk=user_pk)
        # If a user with the id is not found an error is raised
        except User.DoesNotExist:
            raise NotFound()
        # Serializing the response
        serialized_user = BasicProfileSerializer(user_to_show)
        return Response(serialized_user.data, status=status.HTTP_200_OK)