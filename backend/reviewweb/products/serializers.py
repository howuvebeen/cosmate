from rest_framework import serializers, fields

from .models import Company, Ingredient, Product, Category
from users.models import INFLUENCER_CHOICES, SKINISSUE_CHOICES, SKINTYPE_CHOICES


class ProductSerializer(serializers.ModelSerializer):
    """
    Serialize Product Model
    """

    skintype = fields.MultipleChoiceField(
        choices=SKINTYPE_CHOICES, default='C')
    skinissue = fields.MultipleChoiceField(
        choices=SKINISSUE_CHOICES, default='N/A')
    reviews = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Product
        read_only_fields = ['pk', 'reviews', 'average_star',
                            'star_number', 'star_sum', 'review_number', 'profile']
        fields = ['pk', 'name', 'photo', 'description', 'company', 'category',
                  'skintype', 'skinissue', 'ingredients',
                  'reviews', 'average_star', 'star_number', 'star_sum',
                  'review_number', 'profile']


class CompanySerializer(serializers.ModelSerializer):
    """
    Serialize Company Model
    """

    products = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ['pk', 'name', 'year', 'description', 'products']


class IngredientSerializer(serializers.ModelSerializer):
    """
    Serialize Ingredient Model
    """
    class Meta:
        model = Ingredient
        fields = ['pk', 'name']


class CategorySerializer(serializers.ModelSerializer):
    """
    Serialize Category Model
    """

    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = ['pk', 'name', 'products']
