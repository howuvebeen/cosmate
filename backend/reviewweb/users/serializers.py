from rest_framework import serializers, fields
from .models import Profile
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
        fields = ['pk', 'username', 'email',
                  'first_name', 'last_name', 'is_active']


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serialize Profile model
    """

    skintype = fields.MultipleChoiceField(
        choices=SKINTYPE_CHOICES, default='C')
    skinissue = fields.MultipleChoiceField(
        choices=SKINISSUE_CHOICES, default='N/A')
    interested_product = ProductSerializer(many=True, required=False)
    user = serializers.StringRelatedField(read_only=True)
    last_login = serializers.SerializerMethodField()

    def get_last_login(self, obj):
        last_login = obj.user.last_login
        return last_login

    class Meta:
        model = Profile
        read_only_fields = ['user', 'interested_product',
                            'last_login', 'age_range']
        fields = ['user', 'gender', 'dob', 'age', 'skintype', 'skinissue',
                  'influencer', 'interested_product', 'age_range', 'last_login']


class TokenSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    user_pk = serializers.SerializerMethodField()

    def get_username(self, obj):
        user = obj.user.username
        return user

    def get_user_pk(self, obj):
        user = obj.user.pk
        return user

    class Meta:
        model = Token
        fields = ['user_pk', 'username', 'key']
