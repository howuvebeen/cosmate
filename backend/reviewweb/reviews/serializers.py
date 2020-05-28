from rest_framework import serializers

from .models import Review, Like, Feedback


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['author', 'review']


class ReviewSerializer(serializers.ModelSerializer):

    likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Review
        read_only_fields = ['pub_date']
        fields = ['author', 'influencer', 'product',
                  'star', 'review', 'pub_date', 'likes']
