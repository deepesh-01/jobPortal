# Generated by Django 4.1 on 2022-08-21 10:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("application", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Education",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("degree", models.CharField(max_length=255, verbose_name="Degree")),
                ("college", models.CharField(max_length=255, verbose_name="College")),
                (
                    "branch",
                    models.CharField(max_length=255, verbose_name="Description"),
                ),
                (
                    "start_date",
                    models.CharField(max_length=255, verbose_name="Start Date"),
                ),
                ("end_date", models.CharField(max_length=255, verbose_name="End Date")),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="user",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Experience",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("position", models.CharField(max_length=255, verbose_name="Position")),
                ("company", models.CharField(max_length=255, verbose_name="Company")),
                ("start_date", models.DateTimeField(verbose_name="Start Date")),
                ("end_date", models.DateTimeField(verbose_name="End Date")),
                ("decription", models.TextField(verbose_name="Description")),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="user",
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="Application",
        ),
    ]
