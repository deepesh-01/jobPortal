import dataclasses
import datetime
from typing import TYPE_CHECKING

from core import services as user_service

from . import models as application_model

if TYPE_CHECKING:
    from models import Application

@dataclasses.dataclass
class ExperienceDataClass:
    position : str
    company : str
    start_date : datetime.datetime
    end_date : datetime.datetime
    description : str
    id: int = None
    user : user_service.UserDataClass = None

    @classmethod
    def from_instance(cls, experience_model:"Experience") -> "ExperienceDataClass":
        return cls(
            position = experience_model.position,
            company = experience_model.company,
            start_date = experience_model.start_date,
            end_date = experience_model.end_date,
            description = experience_model.description,
            id=experience_model.id,
            user=experience_model.user
        )

def create_experience(user, experience: "ExperienceDataClass") -> "ExperienceDataClass":
    experience_create = application_model.Experience.objects.create(
            position = experience.position,
            company = experience.company,
            start_date = experience.start_date,
            end_date = experience.end_date,
            description = experience.description,
            user=user
    )

    return ExperienceDataClass.from_instance(experience_model=experience_create)


@dataclasses.dataclass
class EducationDataClass:
    degree : str
    college : str
    branch :  str
    start_date : datetime.datetime
    end_date : datetime.datetime
    id: int = None
    user : user_service.UserDataClass = None

    @classmethod
    def from_instance(cls, education_model:"Experience") -> "ExperienceDataClass":
        return cls(
            degree = education_model.degree,
            college = education_model.college,
            branch = education_model.branch,
            start_date = education_model.start_date,
            end_date = education_model.end_date,
            id=education_model.id,
            user=education_model.user
        )

def create_education(user, education: "EducationDataClass") -> "EducationDataClass":
    education_create = application_model.Education.objects.create(
        degree = education.degree,
        college = education.college,
        branch = education.branch,
        start_date = education.start_date,
        end_date = education.end_date,
        user=user
    )

    return EducationDataClass.from_instance(education_model=education_create)

