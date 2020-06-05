from rest_framework import serializers

from .models import Review, Like, Feedback
from users.serializers import ProfileSerializer
from products.serializers import ProductSerializer
from products.models import Product
from users.models import Profile
from django.db.models.signals import post_save
from django.dispatch import receiver

from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

# from django.utils import six



class MyProductRelatedField(serializers.PrimaryKeyRelatedField):

    def to_representation(self, value):
        p_list = list(Product.objects.filter(pk = value.pk))
        return p_list[0].name

class MyAuthorRelatedField(serializers.PrimaryKeyRelatedField):

    def to_representation(self, value):
        a_list = list(Profile.objects.filter(pk = value.pk))
        username = a_list[0].user.username
        skinissue = '['
        for each in a_list[0].skinissue:
            if each == a_list[0].skinissue[-1]:
                skinissue += each + ']'
            else:
                skinissue += each + ', ' 
        
        skintype = '['
        for each in a_list[0].skintype:
            if each == a_list[0].skintype[-1]:
                skintype += each + ']'
            else:
                skintype += each + ', ' 
        result = username + ', ' + skinissue + ', ' + skintype

        return result

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
    product = MyProductRelatedField(queryset = Product.objects.all())
    # product_name = serializers.StringRelatedField(source= 'product', read_only = True)
    author = MyAuthorRelatedField(queryset = Profile.objects.all())


    class Meta:
        model = Review
        read_only_fields = ['pub_date', 'like_number', 'likes']
        fields = ['pk', 'author', 'title', 'influencer', 'product', 
                  'star', 'review', 'pub_date', 'like_number', 'likes']
        
