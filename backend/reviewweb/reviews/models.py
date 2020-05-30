from django.db import models
from users.models import Profile
from products.models import Product
from users.models import INFLUENCER_CHOICES, SKINSHADE_CHOICES, SKINTYPE_CHOICES
import datetime
from django.db.models.signals import post_save
from django.dispatch import receiver

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


class Review(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    influencer = models.CharField(
        max_length=20, choices=INFLUENCER_CHOICES, default="N")
    product = models.ForeignKey(
        Product, related_name='reviews', on_delete=models.CASCADE)
    star = models.IntegerField(default=5, choices=STAR_CHOICES)
    review = models.TextField(max_length=5000, null=True, blank=True)
    pub_date = models.DateField(default=datetime.date.today)
    like_number = models.IntegerField(default=0)

    class Meta:
        ordering = ['pk']

    # @receiver(post_save, sender=Like)
    # def save_user_profile(sender, instance, **kwargs):
    #     review = instance.review
    #     likelist = list(Like.objects.filter(review=review))
    #     likenum = 0
    #     for like in likelist:
    #         likenum += 1

    #     if likenum > review.like_number:
    #         review.like_number = likenum

    #     review.save()
    #     return review.like_number

    def __str__(self):
        return '%d, %s, %s, %s, %d, %s, %s, %s' % (self.pk, self.author, self.influencer, self.product, self.star, self.review, self.pub_date, self.like_number)


class Like(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    review = models.ForeignKey(
        Review, related_name='likes', on_delete=models.CASCADE, null=True, blank=True)


class Feedback(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100)
    content = models.TextField()
