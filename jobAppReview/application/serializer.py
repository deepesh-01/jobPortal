from rest_framework import serializers

from core import serializer as user_serializer

from . import services

class ExperienceSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    position = serializers.CharField()
    company = serializers.CharField()
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()
    description = serializers.CharField()
    user = user_serializer.UserSerializer(read_only=True)

    def to_internal_value(self,data):
        data = super().to_internal_value(data)

        return services.ExperienceDataClass(**data)

class EducationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    degree = serializers.CharField()
    college = serializers.CharField()
    branch = serializers.CharField()
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()
    user = user_serializer.UserSerializer(read_only=True)

    def to_internal_value(self,data):
        data = super().to_internal_value(data)

        return services.EducationDataClass(**data)
    

"""
{
    "experience":[
        {
        "position":"sde",
        "company":"yosecal",
        "start_date":"2020-03-27T19:46:21.343959",
        "end_date":"2020-03-27T19:46:21.343959",
        "description":"abc"
        },
        {
        "position":"sde2",
        "company":"yosecal2",
        "start_date":"2020-03-27T19:46:21.343959",
        "end_date":"2020-03-27T19:46:21.343959",
        "description":"abc2"
        }
    ],
    "education":[
        {
        "degree":"B.Tech",
        "college":"SSTC",
        "branch":"IT",
        "start_date":"2020-03-27T19:46:21.343959",
        "end_date":"2020-03-27T19:46:21.343959"
        },
        {
        "degree":"B.Tech",
        "college":"SSTC",
        "branch":"IT",
        "start_date":"2020-03-27T19:46:21.343959",
        "end_date":"2020-03-27T19:46:21.343959"
        }
    ]
}
"""