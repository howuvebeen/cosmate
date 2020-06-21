from rest_framework import serializers, fields

from .models import Company, Ingredient, Product, Category
from users.models import SkinType, SkinIssue


class MyCompanyRelatedField(serializers.PrimaryKeyRelatedField):
    """
    Custom Related Field for Company Model
    """

    def to_representation(self, value):
        company_list = list(Company.objects.filter(pk=value.pk))
        return company_list[0].name


class MyIngredientRelatedField(serializers.PrimaryKeyRelatedField):
    """
    Custom Related Field for Ingredient Model
    """

    def to_representation(self, value):
        return value.name


class MySkinTypeIssueRelatedField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        return value.name


class MyCategoryRelatedField(serializers.PrimaryKeyRelatedField):
    """
    Custom Related Field for Category Model
    """

    def to_representation(self, value):
        return value.name


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
    photo = serializers.ImageField(
        use_url=True, required=False, allow_empty_file=True)
    reviews = serializers.StringRelatedField(many=True, read_only=True)

    company = MyCompanyRelatedField(queryset=Company.objects.all())
    ingredients = MyIngredientRelatedField(
        many=True, queryset=Ingredient.objects.all())
    category = MyCategoryRelatedField(
        many=True, queryset=Category.objects.all())
    skintype = MySkinTypeIssueRelatedField(
        many=True, queryset=SkinType.objects.all())
    skinissue = MySkinTypeIssueRelatedField(
        many=True, queryset=SkinIssue.objects.all())

    class Meta:
        model = Product
        read_only_fields = ['pk', 'reviews', 'average_star', 'price', 'star_number',
                            'star_sum', 'review_number',
                            'rank_score']
        fields = ['pk', 'name', 'photo', 'price', 'quantity', 'description', 'company', 'category',
                  'skintype', 'skinissue',  'ingredients', 'reviews',
                  'average_star', 'star_number', 'star_sum', 'review_number',
                  'rank_score']


class CategorySerializer(serializers.ModelSerializer):
    """
    Serialize Category Model
    """

    class Meta:
        model = Category
        fields = ['pk', 'name']
