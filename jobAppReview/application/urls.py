from django.urls import path

from . import views

urlpatterns = [
    path("application/", views.NewApplicationApi.as_view(), name="application")
]