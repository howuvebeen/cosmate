from rest_framework import serializers, fields

from .models import Company, Ingredient, Product, Category1, Category2, Category3, Category4
from users.models import SkinType, SkinIssue

from PIL import Image


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


class MyCategory1RelatedField(serializers.PrimaryKeyRelatedField):
    """
    Custom Related Field for Category Model
    """

    def to_representation(self, value):
        return value.name

class MyCategory2RelatedField(serializers.PrimaryKeyRelatedField):
    """
    Custom Related Field for Category Model
    """

    def to_representation(self, value):
        return value.name

class MyCategory3RelatedField(serializers.PrimaryKeyRelatedField):
    """
    Custom Related Field for Category Model
    """

    def to_representation(self, value):
        return value.name

class MyCategory4RelatedField(serializers.PrimaryKeyRelatedField):
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
    # picture = PictureSerializer(source='picture_set', many=True, read_only=True)
    reviews = serializers.StringRelatedField(many=True, read_only=True)
    company = MyCompanyRelatedField(queryset=Company.objects.all())
    ingredients = MyIngredientRelatedField(
        many=True, queryset=Ingredient.objects.all())
    category1 = MyCategory1RelatedField(
        many=True, queryset=Category1.objects.all())
    category2 = MyCategory2RelatedField(
        many=True, queryset=Category2.objects.all())
    category3 = MyCategory3RelatedField(
        many=True, queryset=Category3.objects.all())
    category4 = MyCategory4RelatedField(
        many=True, queryset=Category4.objects.all())
    skintype = MySkinTypeIssueRelatedField(
        many=True, queryset=SkinType.objects.all())
    skinissue = MySkinTypeIssueRelatedField(
        many=True, queryset=SkinIssue.objects.all())
    class Meta:
        model = Product
        read_only_fields = ['pk', 'reviews', 'average_star', 'price', 'star_number',
                            'star_sum', 'review_number',
                            'rank_score']
        fields = ['pk', 'name', 'photo', 'price', 'quantity', 'description', 'company',
                  'category1', 'category2', 'category3', 'category4',
                  'skintype', 'skinissue',  'ingredients', 'reviews',
                  'average_star', 'star_number', 'star_sum', 'review_number', 'rank_score']
    
    # def get_image(self, obj):
    #     images = MyImage.objects.filter(product_of_image = obj.pk)
    #     r = []
    #     for each in images:
    #         img = Image.open(each.image.path)
    #         r.append(img)
    #     return r

    # def create(self, validated_data):
    #     # picture_data = self.context.get('view').request.FILES
    #     # product = Product.objects.create(**validated_data)
    #     # for each in picture_data.values():
    #     #     Picture.objects.create(product=product, picture=each)
    #     return Product.objects.create(**validated_data)


class Category1Serializer(serializers.ModelSerializer):
    """
    Serialize Category Model
    """

    class Meta:
        model = Category1
        fields = ['pk', 'name']

class Category2Serializer(serializers.ModelSerializer):
    """
    Serialize Category Model
    """

    class Meta:
        model = Category2
        fields = ['pk', 'name']

class Category3Serializer(serializers.ModelSerializer):
    """
    Serialize Category Model
    """

    class Meta:
        model = Category3
        fields = ['pk', 'name']

class Category4Serializer(serializers.ModelSerializer):
    """
    Serialize Category Model
    """

    class Meta:
        model = Category4
        fields = ['pk', 'name']

