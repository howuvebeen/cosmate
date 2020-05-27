from django.db import models

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

import datetime


GENDER_CHOICES = (
    ("M", "Male"),
    ("F", "Female"),
    ("D", "Do not want to select")
)
SKINTYPE_CHOICES = (
    ("O", "Oily"),
    ("D", "Dry"),
    ("C", "Combinational"),
)
SKINSHADE_CHOICES = (
    ("F", "Fair"),
    ("L", "Light"),
    ("M", "Medium"),
    ("D", "Dark"),
)
INFLUENCER_CHOICES = (
    ("Y", "Yes"),
    ("N", "No"),
)


class Profile(models.Model):
    user = models.OneToOneField(
        'auth.User', related_name='profiles', on_delete=models.CASCADE)
    gender = models.CharField(
        max_length=20, choices=GENDER_CHOICES, default="D")
    dob = models.DateField(
        default=datetime.date.today, blank=True, null=True)
    skintype = models.CharField(
        max_length=20, choices=SKINTYPE_CHOICES, default="C", null=True)
    skinshade = models.CharField(
        max_length=20, choices=SKINSHADE_CHOICES, default="F", null=True)
    influencer = models.CharField(
        max_length=20, choices=INFLUENCER_CHOICES, default="N", null=True)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profiles.save()
