from django.shortcuts import render

from rest_framework import generics
from reviews.models import Review, Like
from reviews.serializers import ReviewSerializer, LikeSerializer
from users.models import Profile

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from django.shortcuts import get_object_or_404

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'reviews': reverse('review-list', request=request, format=format)
    })


class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):

        profile = get_object_or_404(Profile, user = self.request.user.pk)

        serializer.save(author=profile)


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class LikeList(generics.ListCreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.profile)


class LikeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

# Create your views here.
