from django.db import models
from users.models import Profile
from products.models import Product
from users.models import INFLUENCER_CHOICES, SKINISSUE_CHOICES, SKINTYPE_CHOICES
import datetime
from django.db.models.signals import post_save, pre_delete, post_delete
from django.db.models import signals
from django.dispatch import receiver

ONE = 1
TWO = 2
THREE = 3
FOUR = 4
FIVE = 5
STAR_CHOICES = (
    (ONE, "1"),
    (TWO, "2"),
    (THREE, "3"),
    (FOUR, "4"),
    (FIVE, "5")
)


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
    title = models.CharField(max_length=200, default='Put Title Here')
    influencer = models.CharField(
        max_length=20, choices=INFLUENCER_CHOICES, default="N")
    product = models.ForeignKey(
        Product, related_name='reviews', on_delete=models.CASCADE)
    star = models.IntegerField(
        default=5,
        choices=STAR_CHOICES
    )
    review = models.TextField(max_length=5000, null=True, blank=True)
    pub_date = models.DateField(default=datetime.date.today)
    like_number = models.IntegerField(default=0)

    class Meta:
        ordering = ['pk']

    def __str__(self):
        return '%d, %s, %s, %s, %d, %s, %s, %s' % (self.pk, self.author, self.influencer, self.product, self.star, self.review, self.pub_date, self.like_number)

    def after_save_review_update(sender, instance, *args, **kwargs):
        """
        Summing stars, adding star number, calculating average star
        when review was saved(created or updated)
        """
        review = instance
        product = review.product

        reviewlist = list(Review.objects.filter(product=product))
        print(len(reviewlist))
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
        Review, related_name='likes', on_delete=models.CASCADE, null=True, blank=True)

    def save_like_update(sender, instance, *args, **kwargs):
        """
        Adding the number of likes of a review when a new like object was saved.
        """
        review = instance.review
        likelist = list(Like.objects.filter(review=review))
        review.like_number = len(likelist)
        review.save()

    def delete_like_update(sender, instance, *args, **kwargs):
        """
        Subtracting the number of likes of a review when a new like object
        was deleted.
        """
        review = instance.review
        likelist = list(Like.objects.filter(review=review))
        review.like_number = len(likelist)
        review.save()


signals.post_save.connect(Like.save_like_update, sender=Like)
signals.post_delete.connect(Like.delete_like_update, sender=Like)


class Feedback(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100)
    content = models.TextField()
