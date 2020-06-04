from django.db import models
from users.models import INFLUENCER_CHOICES, SKINISSUE_CHOICES, SKINTYPE_CHOICES, Profile
import datetime
from django.db.models import signals
from multiselectfield import MultiSelectField


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
    photo = models.ImageField(
        default='static/product_default_image.png', upload_to='media')
    description = models.TextField(max_length=1000, default='No Description')
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name='products')
    category = models.ManyToManyField(Category)
    skintype = MultiSelectField(
        max_length=20, choices=SKINTYPE_CHOICES, default='C')
    skinissue = MultiSelectField(
        max_length=30, choices=SKINISSUE_CHOICES, default='N/A')
    ingredients = models.ManyToManyField(Ingredient)
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
