import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied
from rest_framework.authentication import BasicAuthentication

User = get_user_model()

class JWTAuthentication(BasicAuthentication):

    # Function that authenticates request headers
    def authenticate(self, request):
        header = request.headers.get('Authorization')
        # No header returning None
        if not header:
            return None
        # Returning an error if header is in an incorrect format
        if not header.startswith('Bearer'):
            raise PermissionDenied({'detail': 'Invalid Auth Header'})
        token = header.replace('Bearer ', '')

        # Attempting to decode token
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        # Raising an error if token is invalid
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied({'detail': 'Invalid Token'})
        except User.DoesNotExist:
            raise PermissionDenied({'detail': 'User Not Found'})
        return (user, token)