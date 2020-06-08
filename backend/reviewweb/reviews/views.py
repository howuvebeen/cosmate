from django.shortcuts import render
from rest_framework.views import APIView

from rest_framework import generics, filters, permissions
from .models import Review, Like
from .serializers import ReviewSerializer, LikeSerializer
from .permissions import IsOwnerOrReadOnly

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
    View with POST, GET request for creating review and listing reviews
    Reviews can be categorized by author, influencer,
    product, star, review, pub_date, like_number
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    queryset = Review.objects.all().order_by('-like_number')
    serializer_class = ReviewSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['author', 'product', 'author__influencer']


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific review object
    """
    permission_classes = [
        permissions.IsAdminUser] # change with new IsOwnerOrReadOnly

    queryset = Review.objects.all().order_by('-like_number')
    serializer_class = ReviewSerializer


class LikeList(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating like and listing likes
    Likes can be categorized by author and review
    """
    permission_classes = [permissions.IsAdminUser]

    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class LikeDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific like object
    """
    permission_classes = [
        permissions.IsAdminUser] # change with new IsOwnerOrReadOnly

    queryset = Like.objects.all()
    serializer_class = LikeSerializer


"""
http -a dong1:rlaehdgh123 PUT http://127.0.0.1:8000/reviews/reviews/35 title="hello"

brew install httpie --HEAD /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)" 
"""
