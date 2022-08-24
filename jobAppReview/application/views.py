from rest_framework import views
from rest_framework import response
from rest_framework import permissions
import json

from . import serializer as application_serializer
from . import services 

from core import authentication

class NewApplicationApi(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permissions_classes = (permissions.IsAuthenticated,)

    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))

        resp_dict = {"experience":[],"education":[]}
        ex=0
        ed=0
        #experience

        for d in data["experience"]:
            print(d)
            experience_serializer = application_serializer.ExperienceSerializer(data=d)
            experience_serializer.is_valid(raise_exception=True)
            experience_data = experience_serializer.validated_data
            experience_serializer.instance = services.create_experience(user=request.user, experience=experience_data)
            try:
                resp_dict["experience"].append(experience_serializer.data)
            except KeyError:
                resp_dict["experience"] = [experience_serializer.data]

        #education
        for d in data["education"]:
            print(d)
            education_serializer = application_serializer.EducationSerializer(data=d)
            education_serializer.is_valid(raise_exception=True)
            education_data = education_serializer.validated_data
            education_serializer.instance = services.create_education(user=request.user, education=education_data)
            try:
                resp_dict["education"].append(education_serializer.data)
            except KeyError:
                resp_dict["education"] = [education_serializer.data]

        resp = response.Response()

        print(resp_dict)

        # print(experience_serializer.data)
        # print(education_serializer.data)

        data = {"experience" : experience_serializer.data, "education": education_serializer.data}

        resp.data = resp_dict
        
        return resp

    def get(self,request):
        return response.Response(data="world")

