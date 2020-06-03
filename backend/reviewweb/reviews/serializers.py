from rest_framework import serializers

from .models import Review, Like, Feedback
# from users.serializers import UserSerializer
from django.db.models.signals import post_save
from django.dispatch import receiver


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = ['pk', 'author', 'review']


class ReviewSerializer(serializers.ModelSerializer):

    likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # author = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Review
        read_only_fields = ['pub_date']
        fields = ['pk', 'author', 'title', 'influencer', 'product',
                  'star', 'review', 'pub_date', 'like_number', 'likes']
