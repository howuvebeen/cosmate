from rest_framework import serializers

from .models import Review, Like, Feedback


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['author', 'review']


class ReviewSerializer(serializers.ModelSerializer):

    likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    like_number = serializers.SerializerMethodField()

    def get_like_number(self, obj):
        likelist = list(Like.objects.filter(review=obj))
        likenum = 0
        for like in likelist:
            likenum += 1

        if likenum > obj.like_number:
            obj.like_number = likenum

        obj.save()
        return obj.like_number

    class Meta:
        model = Review
        read_only_fields = ['pub_date']
        fields = ['author', 'influencer', 'product',
                  'star', 'review', 'pub_date', 'like_number', 'likes']
