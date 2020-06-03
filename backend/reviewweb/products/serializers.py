from rest_framework import serializers

from .models import Company, Ingredient, Product, Category
from reviews.serializers import ReviewSerializer


class ProductSerializer(serializers.ModelSerializer):

    # reviews = serializers.StringRelatedField(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    ingredients = serializers.StringRelatedField(many=True, read_only=True)
    category = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['pk', 'name', 'company', 'category',
                  'skintype', 'skinshade', 'ingredients',
                  'reviews', 'average_star', 'star_number', 'star_sum', 'profile']


class CompanySerializer(serializers.ModelSerializer):

    products = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ['pk', 'name', 'year', 'description', 'products']


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['pk', 'name']


class CategorySerializer(serializers.ModelSerializer):

    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = ['pk', 'name', 'products']
