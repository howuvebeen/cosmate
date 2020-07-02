from django.db import models

from django.contrib.auth.models import User
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from .choices import GENDER_CHOICES, INFLUENCER_CHOICES, SKINISSUE_CHOICES, SKINTYPE_CHOICES, AGE_RANGE_CHOICES

import datetime



class SkinType(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class SkinIssue(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Profile(models.Model):
    from products.models import Product
    user = models.OneToOneField(
        'auth.User', related_name='profiles', on_delete=models.CASCADE)
    gender = models.CharField(
        max_length=50, choices=GENDER_CHOICES, default="D")
    dob = models.DateField(
        default=datetime.date.today, blank=True, null=True)
    age = models.IntegerField(default=0)
    influencer = models.CharField(
        max_length=20, choices=INFLUENCER_CHOICES, default="N", null=True)
    influencer_link = models.URLField(max_length=200, null=True, blank=True)
    age_range = models.CharField(
        max_length=20, choices=AGE_RANGE_CHOICES, default='20')
    skinissue = models.ManyToManyField(
        SkinIssue, related_name='skinissue', blank=True, null = True)
    skintype = models.ManyToManyField(
        SkinType, related_name='skintype', blank=True, null = True)
    
    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        """
        Calculating age when profile object is saved
        """
        today = datetime.date.today()
        self.age = today.year - self.dob.year - \
            ((today.month, today.day) < (self.dob.month, self.dob.day))
        if self.age >= 0 and self.age <= 9:
            self.age_range = "0 - 9"
        elif self.age >= 10 and self.age <= 19:
            self.age_range = "10 - 19"
        elif self.age >= 20 and self.age <= 29:
            self.age_range = "20 - 29"
        elif self.age >= 30 and self.age <= 39:
            self.age_range = "30 - 39"
        elif self.age >= 40 and self.age <= 49:
            self.age_range = "40 - 49"
        elif self.age >= 50 and self.age <= 59:
            self.age_range = "50 - 59"
        elif self.age >= 60 and self.age <= 69:
            self.age_range = "60 - 69"
        elif self.age >= 70:
            self.age_range = "70+"
        super(Profile, self).save(*args, **kwargs)

class Interest(models.Model):
    """
    Model for interested products
    """
    from products.models import Product
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name = 'interest')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)



@receiver(post_save, sender = Interest)
def create_interest(sender, instance, **kwargs):
    """
    Checks for duplicate interests and deletes if found
    """
    a = Interest.objects.all().filter(
        author= instance.author,
        product= instance.product
    )
    alist = list(a)
    if len(a) > 1:
        instance.delete()
        

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
Overriding User model's __str__ function with get_username function
"""
User.add_to_class("__str__", get_username)
