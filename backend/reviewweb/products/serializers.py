from rest_framework import serializers, fields

from .models import Company, Ingredient, Product, Category
from users.models import INFLUENCER_CHOICES, SKINISSUE_CHOICES, SKINTYPE_CHOICES


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


class ProductSerializer(serializers.ModelSerializer):
    """
    Serialize Product Model
    """

    skintype = fields.MultipleChoiceField(
        choices=SKINTYPE_CHOICES, default='C')
    skinissue = fields.MultipleChoiceField(
        choices=SKINISSUE_CHOICES, default='N/A')
    photo = serializers.ImageField(use_url = True, required = False, allow_empty_file=True)
    reviews = serializers.StringRelatedField(many=True, read_only=True)
    ingredients = serializers.PrimaryKeyRelatedField(many=True, queryset=Ingredient.objects.all())


    skintype_name = serializers.StringRelatedField(source = 'skintype', read_only = True)
    skinissue_name = serializers.StringRelatedField(source = 'skinissue', read_only = True)
    
    ingredient_name = serializers.StringRelatedField(source = 'ingredients.name', read_only = True)

    class Meta:
        model = Product
        read_only_fields = ['pk', 'reviews', 'average_star',
                            'star_number', 'star_sum', 'review_number', 'profile']
        fields = ['pk', 'name', 'photo', 'description', 'company', 'category',
                  'skintype', 'skinissue', 'skintype_name', 'skinissue_name', 'ingredients', 
                  'ingredient_name', 'reviews', 'average_star', 'star_number', 
                  'star_sum',
                  'review_number', 'profile']


class CategorySerializer(serializers.ModelSerializer):
    """
    Serialize Category Model
    """

    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = ['pk', 'name', 'products']


