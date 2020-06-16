from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth.models import User
from .models import Profile
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, ProfileSerializer, TokenSerializer
from reviews.permissions import ProfileIsOwnerOrReadOnly
from users.permissions import IsOwnerOrReadOnly

from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.


class UserList(generics.ListAPIView):
    """
    View with GET request for listing Users that can be categorized 
    by username, email, first name, last name, is_active.
    """
    permission_classes = [permissions.IsAdminUser]

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific User object
    """
    permission_classes = [permissions.IsAuthenticated,
                          IsOwnerOrReadOnly]

    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileList(generics.ListAPIView):
    """
    View with GET request for listing Profiles that can be categorized 
    by user, gender, dob, skintype, skinissue, influencer, interested products
    """
    permission_classes = [permissions.IsAuthenticated]

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific Profile object
    """
    permission_classes = [
        permissions.IsAuthenticated, ProfileIsOwnerOrReadOnly]

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class TokenDetail(generics.RetrieveAPIView):
    permission_classes = [IsOwnerOrReadOnly]

    queryset = Token.objects.all()
    serializer_class = TokenSerializer
    lookup_field = 'key'
