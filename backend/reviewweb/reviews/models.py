from django.db import models
from users.models import Profile
from users.models import INFLUENCER_CHOICES, SKINSHADE_CHOICES, SKINTYPE_CHOICES
import datetime

ONE = 1
TWO = 2
THREE = 3
FOUR = 4
FIVE = 5
STAR_CHOICES = (
    (ONE, "One"),
    (TWO, "Two"),
    (THREE, "Three"),
    (FOUR, "Four"),
    (FIVE, "Five")
)


class Company(models.Model):
    name = models.CharField(max_length=150)
    year = models.DateField(default=datetime.date.today, blank=True, null=True)
    description = models.TextField()


class Ingredient(models.Model):
    name = models.CharField(max_length=150)


class Product(models.Model):
    name = models.CharField(max_length=150)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    category = models.CharField(max_length=50)
    skintype = models.CharField(
        max_length=20,  choices=SKINTYPE_CHOICES, default="C")
    skinshade = models.CharField(
        max_length=20,  choices=SKINSHADE_CHOICES, default="F")
    ingredients = models.ManyToManyField(Ingredient)


class Review(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    influencer = models.CharField(
        max_length=20, choices=INFLUENCER_CHOICES, default="N")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    star = models.IntegerField(default=5, choices=STAR_CHOICES)


class Like(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    review = models.ForeignKey(Review, on_delete=models.CASCADE, null=True)


class Feedback(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100)
    content = models.TextField()


class Comment(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    content = models.TextField()
    #review = models.ForeignKey(Review, on_delete=models.CASCADE, null=True)
