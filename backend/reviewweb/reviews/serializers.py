from rest_framework import serializers

from reviews.models import Company, Ingredient, Product, Review, Like, Feedback, Comment, Category


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name']


class ProductSerializer(serializers.ModelSerializer):

    reviews = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['name', 'company', 'category',
                  'skintype', 'skinshade', 'ingredients', 'reviews']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['author', 'review']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['author', 'content', 'review']


class CompanySerializer(serializers.ModelSerializer):

    products = ProductSerializer(many=True)

    class Meta:
        model = Company
        fields = ['name', 'year', 'description', 'products']


class ReviewSerializer(serializers.ModelSerializer):

    likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Review
        read_only_fields = ['pub_date']
        fields = ['author', 'influencer', 'product',
                  'star', 'review', 'pub_date', 'likes']


class CategorySerializer(serializers.ModelSerializer):

    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = ['name', 'products']
