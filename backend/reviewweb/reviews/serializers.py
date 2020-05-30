from rest_framework import serializers

from .models import Review, Like, Feedback
from django.db.models.signals import post_save
from django.dispatch import receiver


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['author', 'review']


class ReviewSerializer(serializers.ModelSerializer):

    likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    like_number = serializers.SerializerMethodField()

    def get_like_number(self, obj):
        return obj.like_number

    # @receiver(post_save, sender=Like)
    # def get_like_number(sender, instance, **kwargs):
    #     review = instance.review
    #     likelist = list(Like.objects.filter(review=review))
    #     likenum = 0
    #     for like in likelist:
    #         likenum += 1

    #     if likenum > review.like_number:
    #         review.like_number = likenum

    #     review.save()
    #     return review.like_number

    class Meta:
        model = Review
        read_only_fields = ['pub_date']
        fields = ['author', 'influencer', 'product',
                  'star', 'review', 'pub_date', 'like_number', 'likes']
