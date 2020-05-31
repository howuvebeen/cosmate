from rest_framework import serializers

from .models import Company, Ingredient, Product, Category


class ProductSerializer(serializers.ModelSerializer):

    reviews = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['name', 'company', 'category',
                  'skintype', 'skinshade', 'ingredients', 
                  'reviews', 'average_star', 'star_number', 'star_sum', 'profile']


class CompanySerializer(serializers.ModelSerializer):

    products = ProductSerializer(many=True)

    class Meta:
        model = Company
        fields = ['name', 'year', 'description', 'products']


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name']


class CategorySerializer(serializers.ModelSerializer):

    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = ['name', 'products']
