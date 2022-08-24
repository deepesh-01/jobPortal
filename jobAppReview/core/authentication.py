from django.conf import settings
from rest_framework import authentication, exceptions
import jwt

from . import models

class CustomUserAuthentication(authentication.BaseAuthentication):

    def authenticate(self, request):
        print("request : ",request.META)

        headers = request.META.get('HTTP_AUTHORIZATION')

        print("headers",type(headers))
        # print("headers.Authorization",headers.Authorization)

        token = headers.split()[1]
        print("token:",token)

        if not token:
            return None

        try:
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        except:
            raise exceptions.AuthenticationFailed("Unauthorized")

        user = models.User.objects.filter(id=payload["id"]).first()

        print("user : ", user)
        return (user, None)

