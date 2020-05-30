from django.shortcuts import render
from rest_framework.views import APIView

from rest_framework import generics
from .models import Review, Like
from .serializers import ReviewSerializer, LikeSerializer

from rest_framework.decorators import api_view

from rest_framework.response import Response
from rest_framework.reverse import reverse

from django.shortcuts import get_object_or_404
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'reviews': reverse('review-list', request=request, format=format)
    })


class ReviewList(generics.ListCreateAPIView):
    """
    List all reviews, or create a review
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['author', 'product__name']


class ProductReviewList(generics.ListAPIView):
    """
    List all reviews for a specific product
    """
    serializer_class = ReviewSerializer

    def get_queryset(self):
        product = self.kwargs['product']
        return Review.objects.filter(product__name=product)


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all().order_by('-like_number')
    serializer_class = ReviewSerializer


class LikeList(generics.ListCreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def post(self, request, format=None):
        serializer = LikeSerializer(data=request.data)
        if serializer.is_valid():
            like = serializer.save()
            review = like.review
            likelist = list(Like.objects.filter(review=review))
            likenum = 0

            for like in likelist:
                likenum += 1

            if likenum > review.like_number:
                review.like_number = likenum

            review.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LikeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
