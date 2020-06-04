from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth.models import User
from .models import Profile
from .serializers import UserSerializer, ProfileSerializer

from django.http import Http404
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.


class UserList(generics.ListAPIView):
    """
    View with GET request for listing Users that can be categorized 
    by username, email, first name, last name, is_active.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific User object
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileList(generics.ListAPIView):
    """
    View with GET request for listing Profiles that can be categorized 
    by user, gender, dob, skintype, skinissue, influencer, interested products
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific Profile object
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
