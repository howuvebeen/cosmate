from rest_framework import serializers

from .models import Review, Like, Feedback
from users.serializers import ProfileSerializer
from products.serializers import ProductSerializer
from products.models import Product
from django.db.models.signals import post_save
from django.dispatch import receiver

from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

# from django.utils import six


# class MyPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):

#     def to_representation(self, value):
#         return six.text_type(value)

class LikeSerializer(serializers.ModelSerializer):
    """
    Serialize Like Model
    """

    class Meta:
        model = Like
        fields = ['pk', 'author', 'review']


class ReviewSerializer(serializers.ModelSerializer):
    """
    Serialize Review Model
    """

    likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    product = serializers.PrimaryKeyRelatedField(queryset = Product.objects.all())
    product_name = serializers.StringRelatedField(source= 'product', read_only = True)
    # author = serializers.StringRelatedField(read_only=False)

    class Meta:
        model = Review
        read_only_fields = ['pub_date', 'like_number', 'likes']
        fields = ['pk', 'author', 'title', 'influencer', 'product', 'product_name',
                  'star', 'review', 'pub_date', 'like_number', 'likes']
