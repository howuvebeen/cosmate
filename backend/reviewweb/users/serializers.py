from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from products.serializers import ProductSerializer


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

    interested_product = ProductSerializer(many=True, required=False)
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'gender', 'dob', 'age',
                  'skintype', 'skinissue', 'influencer', 'interested_product']
