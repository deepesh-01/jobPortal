from rest_framework import views, response, exceptions, permissions

from . import serializer as user_serializer
from . import services, authentication

# Create your views here.

class RegisterApi(views.APIView):
    def post(self, request):
        serializer = user_serializer.UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        serializer.instance = services.create_user(user_dc=data)

        print(data)

        return response.Response(data=serializer.data)

class LoginApi(views.APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        user=services.user_email_selector(email)

        if user is None:
            raise exceptions.AuthenticationFailed("Invalid Credentials")

        if not user.check_password(raw_password=password):
            raise exceptions.AuthenticationFailed("Invalid Credentials")

        token = services.create_token(user_id=user.id)

        serializer = user_serializer.UserSerializer(user)
        # resp.set_cookie(key="jwt", value=token, httponly=True)

        
        data = {"message":"Login Successful","user":serializer.data,"jwt":token}

        print(data)

        return response.Response(data=data)

class UserApi(views.APIView):
    """
    This endpoint can only be used if user is authenticated
    """

    authentication_classes = (authentication.CustomUserAuthentication, )
    permissions_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = user_serializer.UserSerializer(user)
        resp = response.Response()
        resp.data = {"message":"User Authentication Successful","user":serializer.data}
        return resp

class LogoutApi(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permissions_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        resp = response.Response()
        resp.delete_cookie("jwt")

        resp.data = {"message":"Logout Successful"}

        return resp

