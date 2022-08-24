from django.db import models
from django.contrib.auth import models as auth_models
from django.core.validators import RegexValidator

class UserManager(auth_models.BaseUserManager):
    def create_user(self, 
                    first_name:str, 
                    last_name:str, 
                    email:str, 
                    mobile_no:int, 
                    password: str=None, 
                    is_staff=False, 
                    is_superuser=False
                ) -> "User":
        if not email:
            raise ValueError("User must have email")

        if not first_name:
            raise ValueError("User must have first name")

        if not last_name:
            raise ValueError("User must have last name")

        user = self.model(email=self.normalize_email(email))
        user.first_name = first_name
        user.last_name = last_name
        user.mobile_no = mobile_no
        user.set_password(password)
        user.is_active = True
        user.is_staff = is_staff
        user.is_superuser =  is_superuser
        user.save()

        return user

    def create_superuser(self, 
                        first_name:str, 
                        last_name:str, 
                        email:str, 
                        password:str,
                        mobile_no:int,
                    ) -> "User":
        user = self.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            mobile_no=mobile_no,
            is_staff=True,
            is_superuser=True
        )
        user.save()

        return user

class User(auth_models.AbstractUser):
    first_name = models.CharField(verbose_name="First Name", max_length=255)
    last_name = models.CharField(verbose_name="Last Name", max_length=255)
    email = models.EmailField(verbose_name="Email", max_length=255, unique=True)
    password = models.CharField(max_length=255)
    mobile_no = models.CharField(verbose_name="Mobile Number", 
                                 max_length=10, 
                                 validators=[RegexValidator(
                                    regex='^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$',
                                    message="Invalid Mobile Number",
                                    code="invalid_mobile"
                                    )]
                                )
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = UserManager()

