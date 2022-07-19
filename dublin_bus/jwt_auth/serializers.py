from rest_framework import serializers
from django.contrib.auth import get_user_model
from api.serializers import BasicStopsSerializer, BasicRoutesSignSerializer
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    # Function that validates a passord and passowrd_confirmation
    def validate(self, data):
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')
        # Rasing an error if password and password_confirmation do not match
        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'Does Not Match'})
        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = '__all__'


class BasicProfileSerializer(serializers.ModelSerializer):
    favourited_stops = BasicStopsSerializer(many=True)
    favourited_routes = BasicRoutesSignSerializer(many=True)

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'profile_image',
            'favourited_stops',
            'favourited_routes',
        )

class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'profile_image'
        )