from django.db import models

from django.conf import settings

class Experience(models.Model):
    user=models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        verbose_name="user"
    )

    position = models.CharField(verbose_name="Position", max_length=255)
    company = models.CharField(verbose_name="Company", max_length=255)
    start_date = models.DateTimeField(verbose_name="Start Date")
    end_date = models.DateTimeField(verbose_name="End Date")
    description = models.TextField(verbose_name="Description")

class Education(models.Model):
    user=models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        verbose_name="user"
    )

    degree = models.CharField(verbose_name="Degree", max_length=255)
    college = models.CharField(verbose_name="College", max_length=255)
    branch = models.CharField(verbose_name="Description", max_length=255)
    start_date = models.CharField(verbose_name="Start Date", max_length=255)
    end_date = models.CharField(verbose_name="End Date", max_length=255)

