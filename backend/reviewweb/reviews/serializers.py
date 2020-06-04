from rest_framework import serializers

from .models import Review, Like, Feedback
from users.serializers import ProfileSerializer
from django.db.models.signals import post_save
from django.dispatch import receiver

from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = ['pk', 'author', 'review']


class ReviewSerializer(serializers.ModelSerializer):

    likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # author = serializers.StringRelatedField(read_only=False)
    renderer_classes = [JSONRenderer]

    class Meta:
        model = Review
        read_only_fields = ['pub_date', 'like_number', 'likes']
        fields = ['pk', 'author', 'title', 'influencer', 'product',
                  'star', 'review', 'pub_date', 'like_number', 'likes']
