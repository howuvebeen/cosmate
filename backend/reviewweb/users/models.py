from django.db import models

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

import datetime
from multiselectfield import MultiSelectField

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
# Trouble / Acne / Sensitive Skin / None
SKINISSUE_CHOICES = (
    ("T", "Trouble"),
    ("A", "Acne"),
    ("SS", "Sensitive Skin"),
    ("N/A", "None"),
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
    age = models.IntegerField(default=0)
    skintype = MultiSelectField(
        max_length=20, choices=SKINTYPE_CHOICES, default='C')
    skinissue = MultiSelectField(
        max_length=30, choices=SKINISSUE_CHOICES, default='N/A')
    influencer = models.CharField(
        max_length=20, choices=INFLUENCER_CHOICES, default="N", null=True)

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        """
        Calculating age when profile object is saved
        """
        today = datetime.date.today()
        self.age = today.year - self.dob.year - \
            ((today.month, today.day) < (self.dob.month, self.dob.day))
        super(Profile, self).save(*args, **kwargs)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Creating profile object when user is created
    """
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """
    Saving profile object when user is saved
    """
    instance.profiles.save()


def get_username(self):
    """
    Getting user's username
    """
    return self.username


"""
Overriding user __str__ function with get_username function
"""
User.add_to_class("__str__", get_username)
