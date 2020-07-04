from rest_framework import serializers

from .models import Review, Like, Feedback
from users.serializers import ProfileSerializer, SkinTypeSerializer, SkinIssueSerializer
from products.serializers import ProductSerializer
from products.models import Product
from users.models import Profile, SkinType, SkinIssue
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Q

from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

import json

# from django.utils import six


class MyProductRelatedField(serializers.PrimaryKeyRelatedField):

    def to_representation(self, value):
        p_list = list(Product.objects.filter(pk=value.pk))
        return p_list[0].name


class MyAuthorRelatedField(serializers.PrimaryKeyRelatedField):

    def to_representation(self, value):
        a_list = list(Profile.objects.filter(pk=value.pk))

        return a_list[0].user.username


class ReviewSerializer(serializers.ModelSerializer):
    """
    Serialize Review Model for Review Lish
    """
    likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    product = MyProductRelatedField(queryset=Product.objects.all())
    # product_name = serializers.StringRelatedField(source= 'product', read_only = True)
    author = MyAuthorRelatedField(queryset=Profile.objects.all())
    photo = serializers.ImageField(
        use_url=True, required=False, allow_empty_file=True)
    skinissue = serializers.SerializerMethodField()
    skintype = serializers.SerializerMethodField()
    age = serializers.SerializerMethodField()
    age_range = serializers.SerializerMethodField()

    def get_age(self, obj):
        age = obj.author.age
        return age

    def get_age_range(self, obj):
        age_range = obj.author.age_range
        return age_range

    def get_skinissue(self, obj):
        skinissue = list(SkinIssue.objects.filter(skinissue=obj.author.pk))
        issuelist = []
        for obj in skinissue:
            issuelist.append(obj.name)

        # return SkinIssueSerializer(many=True, queryset=skinissue)
        return issuelist

    def get_skintype(self, obj):
        skintype = list(SkinType.objects.filter(skintype=obj.author.pk))
        typelist = []
        for obj in skintype:
            typelist.append(obj.name)
        return typelist

    class Meta:
        model = Review
        read_only_fields = ['pub_date', 'like_number', 'likes']
        fields = ['pk', 'author', 'title', 'photo', 'age', 'skintype', 'skinissue', 'influencer', 'product',
                  'star', 'review', 'pub_date', 'like_number', 'likes', 'age_range']


class LikeSerializer(serializers.ModelSerializer):
    """
    Serialize Like Model
    """
    author = serializers.PrimaryKeyRelatedField(required = True, queryset = Profile.objects.all())
    review = serializers.PrimaryKeyRelatedField(required = True, queryset = Review.objects.all())
    product_photo = serializers.SerializerMethodField()
    product_name = serializers.SerializerMethodField()
    product_company_name = serializers.SerializerMethodField()

    def get_product_photo(self, obj):
        product_photo = obj.review.product.photo.url
        return product_photo

    def get_product_name(self, obj):
        product_name = obj.review.product.name
        return product_name

    def get_product_company_name(self, obj):
        product_company_name = obj.review.product.company.name
        return product_company_name
    
    class Meta:
        model = Like
        fields = ['pk', 'author', 'review', 'product_photo', 'product_name', 'product_company_name']


class FeedbackSerializer(serializers.ModelSerializer):
    """
    Serialize Feedback Model
    """
    class Meta:
        model = Feedback
        fields = ['author', 'title', 'subject', 'content']