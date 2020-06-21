from rest_framework import serializers, fields
from .models import Profile, SkinType, SkinIssue, Interest
from reviews.models import Review
from django.contrib.auth.models import User
from products.serializers import ProductSerializer
from rest_framework.authtoken.models import Token

from users.choices import SKINISSUE_CHOICES, SKINTYPE_CHOICES


class UserSerializer(serializers.ModelSerializer):
    """
    Serialize User Model
    """

    class Meta:
        model = User
        read_only_fields = ['email']
        fields = ['pk', 'username', 'email',
                  'first_name', 'last_name', 'is_active']


class SkinTypeSerializer(serializers.PrimaryKeyRelatedField):

    def to_representation(self, value):
        return value.name


class SkinIssueSerializer(serializers.PrimaryKeyRelatedField):

    def to_representation(self, value):
        return value.name


class MyReviewRelatedField(serializers.PrimaryKeyRelatedField):

    def to_representation(self, value):
        a_list = list(Review.objects.filter(pk=value.pk))

        return a_list[0].user.username


class InterestSerializer(serializers.ModelSerializer):

    product = ProductSerializer()

    class Meta:
        model = Interest
        fields = ['pk', 'product']


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serialize Profile model
    """

    interest = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    user = serializers.StringRelatedField(read_only=True)
    firstname = serializers.SerializerMethodField()
    lastname = serializers.SerializerMethodField()
    age = serializers.SerializerMethodField(read_only=True)
    email = serializers.SerializerMethodField()
    last_login = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    skintype = SkinTypeSerializer(
        many=True, queryset=SkinType.objects.all(), required=False)
    skinissue = SkinIssueSerializer(
        many=True, queryset=SkinIssue.objects.all())

    # def get_skintype(self, obj):
    #     skintype = obj.author.skintype
    #     return skintype

    # def get_skinissue(self, obj):
    #     skinissue = obj.author.skinissue
    #     return skinissue

    def get_last_login(self, obj):
        last_login = obj.user.last_login
        return last_login

    def get_firstname(self, obj):
        firstname = obj.user.first_name
        return firstname

    def get_lastname(self, obj):
        lastname = obj.user.last_name
        return lastname

    def get_age(self, obj):
        return obj.age

    def get_email(self, obj):
        email = obj.user.email
        return email

    def get_reviews(self, obj):
        from reviews.serializers import ProfileReviewSerializer
        reviews = Review.objects.filter(author=obj.pk)
        return ProfileReviewSerializer(reviews, many=True).data

    class Meta:
        model = Profile
        read_only_fields = ['user',
                            'last_login', 'age_range']
        fields = ['user', 'firstname', 'lastname', 'email', 'last_login',
                  'gender', 'dob', 'age', 'age_range',
                  'skintype', 'skinissue', 'influencer', 'influencer_link', 'interest',
                  'reviews']


class TokenSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    user_pk = serializers.SerializerMethodField()
    influencer = serializers.SerializerMethodField()
    last_login = serializers.SerializerMethodField()

    def get_username(self, obj):
        user = obj.user.username
        return user

    def get_user_pk(self, obj):
        user = obj.user.pk
        return user

    def get_influencer(self, obj):
        profile_l = list(Profile.objects.filter(pk=obj.user.pk))
        profile = profile_l[0]
        influencer = profile.influencer
        return influencer

    def get_last_login(self, obj):
        last_login = obj.user.last_login
        return last_login

    class Meta:
        model = Token
        fields = ['user_pk', 'username', 'influencer', 'last_login', 'key']
