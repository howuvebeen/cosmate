from django.db import models
from users.models import INFLUENCER_CHOICES, SKINSHADE_CHOICES, SKINTYPE_CHOICES, Profile
import datetime
from django.db.models import signals


class Company(models.Model):
    name = models.CharField(max_length=150)
    year = models.DateField(default=datetime.date.today, blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=150)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name='products')
    category = models.ManyToManyField(Category, related_name='categories')
    skintype = models.CharField(
        max_length=20,  choices=SKINTYPE_CHOICES, default="C")
    skinshade = models.CharField(
        max_length=20,  choices=SKINSHADE_CHOICES, default="F")
    ingredients = models.ManyToManyField(
        Ingredient, related_name='ingredients')
    average_star = models.FloatField(default=0)
    star_number = models.IntegerField(default=0)
    star_sum = models.FloatField(default=0)
    profile = models.ManyToManyField(
        Profile, related_name='interested_product', blank=True)

    def __str__(self):
        return self.name

    # def save_product_update(sender, instance, *args, **kwargs):
    #     profile = instance.profile
    #     profile.interested_product = instance
    #     profile.save()


# signals.post_save.connect(Product.save_product_update, sender=Product)
