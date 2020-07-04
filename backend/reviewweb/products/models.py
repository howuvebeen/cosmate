from django.db import models
from users.models import SkinType, SkinIssue
from users.choices import INFLUENCER_CHOICES, SKINISSUE_CHOICES, SKINTYPE_CHOICES
import datetime
from django.db.models import signals

from reviewweb.storage_backends import ProductImageStorage, EventMainImageStorage, EventPreviewImageStorage, InstaImageStorage, BannerImageStorage

from PIL import Image
from django.core.files.base import ContentFile
from io import BytesIO


class Company(models.Model):
    name = models.CharField(max_length=150)
    year = models.DateField(default=datetime.date.today, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Category1(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name


class Category2(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name


class Category3(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name


class Category4(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=160)
    photo = models.ImageField(
        default='media/product_default_image.png', blank=True, storage=ProductImageStorage())
    description = models.TextField(max_length=5000, default='No Description')
    price = models.IntegerField(default=0)
    quantity = models.IntegerField(default=0)
    ingredients = models.CharField(max_length=200, blank=True)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name='products', null=True)
    category1 = models.ManyToManyField(Category1)
    category2 = models.ManyToManyField(Category2)
    category3 = models.ManyToManyField(Category3)
    category4 = models.ManyToManyField(Category4)
    skintype = models.ManyToManyField(SkinType)
    skinissue = models.ManyToManyField(SkinIssue)
    average_star = models.FloatField(default=0)
    star_number = models.IntegerField(default=0)
    star_sum = models.FloatField(default=0)
    review_number = models.IntegerField(default=0)
    rank_score = models.FloatField(default=0.0)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        from reviews.models import Review

        # # super().save()  # saving image first

        # img = Image.open(self.photo.path) # Open image using self

        # new_img = (300, 300)
        # img.thumbnail(new_img)
        # img.save(self.photo.path)

        # super().save()  # saving image first

        # img = Image.open(self.photo.path) # Open image using self

        # img.resize((300,300), Image.ANTIALIAS)
        # thumb_io = BytesIO()
        # img.save(thumb_io, img.format, quality=60)
        # self.photo.save(img.filename, ContentFile(thumb_io.getvalue()), save = False)
        # save image path not ContentFile

        total_reviews = len(list(Review.objects.all()))
        if total_reviews != 0:
            self.rank_score = round(
                (((self.average_star/5) * 0.86) + ((self.review_number/total_reviews) * 0.14)), 5)
        super(Product, self).save(*args, **kwargs)

        # img = Image.open(self.photo.path)  # Open image using self

        # new_img = (200, 200)
        # img.thumbnail(new_img)
        # img.save(self.photo.path)


class Event(models.Model):
    title = models.CharField(max_length=100)
    photo = models.ImageField(
        default='media/product_default_image.png', storage=EventMainImageStorage())
    preview_photo = models.ImageField(
        default='media/product_default_image.png', storage=EventPreviewImageStorage())
    pub_date = models.DateField(default=datetime.date.today)
    due_date = models.DateField(blank=True, null=True)
    display = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Banner(models.Model):
    title = models.CharField(max_length=100)
    photo = models.ImageField(
        default='media/product_default_image.png', blank=True, storage=BannerImageStorage())
    display = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Instagram(models.Model):
    title = models.CharField(max_length=100)
    photo = models.ImageField(
        default='media/product_default_image.png', storage=InstaImageStorage())
    url = models.URLField(max_length=200, null=True, blank=True)
    upload_date = models.DateField(auto_now_add=True)
