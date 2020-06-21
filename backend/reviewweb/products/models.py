from django.db import models
from users.models import SkinType, SkinIssue
from users.choices import INFLUENCER_CHOICES, SKINISSUE_CHOICES, SKINTYPE_CHOICES
import datetime
from django.db.models import signals
from multiselectfield import MultiSelectField


class Company(models.Model):
    name = models.CharField(max_length=150)
    year = models.DateField(default=datetime.date.today, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

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
        default='media/product_default_image.png', blank=True)
    description = models.TextField(max_length=5000, default='No Description')
    price = models.IntegerField(default=0)
    quantity = models.IntegerField(default=0)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name='products', null=True)
    category = models.ManyToManyField(Category)
    skintype = models.ManyToManyField(SkinType)
    skinissue = models.ManyToManyField(SkinIssue)
    ingredients = models.ManyToManyField(Ingredient)
    average_star = models.FloatField(default=0)
    star_number = models.IntegerField(default=0)
    star_sum = models.FloatField(default=0)
    review_number = models.IntegerField(default=0)
    rank_score = models.FloatField(default=0.0)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        from reviews.models import Review
        total_reviews = len(list(Review.objects.all()))
        if total_reviews != 0:
            self.rank_score = round(
                (((self.average_star/5) * 0.86) + ((self.review_number/total_reviews) * 0.14)), 5)
        super(Product, self).save(*args, **kwargs)

    # def save_product_update(sender, instance, *args, **kwargs):
    #     profile = instance.profile
    #     profile.interested_product = instance
    #     profile.save()


# signals.post_save.connect(Product.save_product_update, sender=Product)
