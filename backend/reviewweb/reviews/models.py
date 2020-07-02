from django.db import models
from users.models import Profile, SkinType, SkinIssue
from products.models import Product
from users.choices import INFLUENCER_CHOICES, SKINISSUE_CHOICES, SKINTYPE_CHOICES, AGE_RANGE_CHOICES
from .choices import STAR_CHOICES, SUBJECT_CHOICES
import datetime
from django.db.models.signals import post_save, pre_delete, post_delete
from django.db.models import signals
from django.dispatch import receiver

from PIL import Image


def star_sum_calculator(instance):
    """
    Adds the number of stars that a product received from the reviews
    """
    sum = 0
    for object in instance:
        print(object.title)
        sum += object.star

    return sum


class Review(models.Model):
    author = models.ForeignKey(
        Profile, on_delete=models.CASCADE, null=True, related_name='author')
    title = models.CharField(max_length=200, null=True)
    photo = models.ImageField(
        blank=True, null=True)
    influencer = models.CharField(
        max_length=20, choices=INFLUENCER_CHOICES, default="N")
    product = models.ForeignKey(
        Product, related_name='reviews', on_delete=models.CASCADE)
    star = models.IntegerField(
        default=5,
        choices=STAR_CHOICES
    )
    skintype = models.ManyToManyField(SkinType, blank = True)
    skinissue = models.ManyToManyField(SkinIssue, blank = True)
    review = models.TextField(max_length=5000, null=True, blank=True)
    pub_date = models.DateField(default=datetime.date.today)
    like_number = models.IntegerField(default=0)
    age_range = models.CharField(
        max_length=20, choices=AGE_RANGE_CHOICES, default='20')

    class Meta:
        ordering = ['pk']

    def __str__(self):
        return '%d' % (self.pk)

    def create(self, *args, **kwargs):
        super(Review, self).create(*args, **kwargs)

    def save(self, *args, **kwargs):
        super().save()  # saving image first

        if self.photo:
            img = Image.open(self.photo.path) # Open image using self

        
            new_img = (50, 50)
            img.thumbnail(new_img)
            img.save(self.photo.path)

    def after_save_review_update(sender, instance, *args, **kwargs):
        """
        Summing stars, adding star number, calculating average star
        when review was saved(created or updated)
        """
        review = instance
        product = review.product

        reviewlist = list(Review.objects.filter(product=product))
        product.review_number = len(reviewlist)

        product.star_sum = star_sum_calculator(reviewlist)

        product.star_number = len(reviewlist)
        product.average_star = round(
            (product.star_sum/product.star_number), 1)

        product.review_number = product.star_number

        product.save()

    def delete_review_update(sender, instance, *args, **kwargs):
        """
        Subtracting stars, subtracting star number, calculating average star
        when review was deleted
        """
        review = instance
        product = review.product
        reviewlist = list(Review.objects.filter(product=product))
        product.star_number = len(reviewlist)

        product.review_number = product.star_number
        product.star_sum = star_sum_calculator(reviewlist)
        if product.star_number == 0:
            product.average_star = 0
            product.save()
        else:
            product.average_star = round(
                (product.star_sum/product.star_number), 1)
            product.save()


signals.post_save.connect(Review.after_save_review_update, sender=Review)
signals.post_delete.connect(Review.delete_review_update, sender=Review)


class Like(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    review = models.ForeignKey(
        Review, related_name='likes', on_delete=models.CASCADE, null=True)

    def delete_like_update(sender, instance, *args, **kwargs):
        """
        Subtracting the number of likes of a review when a new like object
        was deleted.
        """
        review = instance.review
        likelist = list(Like.objects.filter(review=review))
        review.like_number = len(likelist)
        review.save()

@receiver(post_save, sender = Like)
def create_like(sender, instance, **kwargs):
    """
    Adding the number of likes of a review when a new like object was saved.
    Checks for duplicate interests and deletes if found
    """
    review = instance.review
    a = Like.objects.all().filter(
        author= instance.author,
        review= instance.review
    )
    alist = list(a)
    if len(a) > 1:
        instance.delete()
    likelist = list(Like.objects.filter(review=review))
    review.like_number = len(likelist)
    review.save()

signals.pre_delete.connect(Like.delete_like_update, sender=Like)


class Feedback(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100)
    subject = models.CharField(max_length=100, choices=SUBJECT_CHOICES, default = 'Subject 1')
    content = models.TextField()
