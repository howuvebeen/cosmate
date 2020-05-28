from django.db import models
from users.models import INFLUENCER_CHOICES, SKINSHADE_CHOICES, SKINTYPE_CHOICES
import datetime


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
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category)
    skintype = models.CharField(
        max_length=20,  choices=SKINTYPE_CHOICES, default="C")
    skinshade = models.CharField(
        max_length=20,  choices=SKINSHADE_CHOICES, default="F")
    ingredients = models.ManyToManyField(Ingredient)

    def __str__(self):
        return self.name
