from django.contrib import admin

# Register your models here.
from . import models

class UserExperiences(admin.ModelAdmin):
    list_display=(
        "user",
        "id",
        "position",
        "company",
        "start_date",
        "end_date",
        "description",
    )

admin.site.register(models.Experience, UserExperiences)

class UserEducation(admin.ModelAdmin):
    list_display=(
        "user",
        "id",
        "degree",
        "college",
        "branch",
        "start_date",
        "end_date",
    )

admin.site.register(models.Education, UserEducation)
