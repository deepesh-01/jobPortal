from django.contrib import admin

# Register your models here.
from . import models

class UserAdmin(admin.ModelAdmin):
    list_display=(
        "id",
        "first_name",
        "last_name",
        "email",
        "mobile_no",
    )

admin.site.register(models.User, UserAdmin)
