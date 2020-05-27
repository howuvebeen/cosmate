from rest_framework import serializers

from reviews.models import Company, Ingredient, Product, Review, Like, Feedback, Comment


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name']


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['name', 'company', 'category',
                  'skintype', 'skinshade', 'ingredients']


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
        fields = ['name', 'year', 'description']


class ReviewSerializer(serializers.ModelSerializer):

    likes = LikeSerializer(many=True)

    class Meta:
        model = Review
        fields = ['author', 'influencer', 'product', 'star', 'likes']
