from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User, update_last_login
from .models import Profile, Interest
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, ProfileSerializer, TokenSerializer, InterestSerializer
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
    # permission_classes = [permissions.IsAdminUser]

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific User object
    """
    # permission_classes = [permissions.IsAuthenticated,
    #                       IsOwnerOrReadOnly]

    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileList(generics.ListAPIView):
    """
    View with GET request for listing Profiles that can be categorized 
    by user, gender, dob, skintype, skinissue, influencer, interested products
    """
    # permission_classes = [permissions.IsAuthenticated]

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific Profile object
    """
    # permission_classes = [
    #     permissions.IsAuthenticated, ProfileIsOwnerOrReadOnly]

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class TokenDetail(generics.RetrieveAPIView):
    permission_classes = [IsOwnerOrReadOnly]

    queryset = Token.objects.all()
    serializer_class = TokenSerializer
    lookup_field = 'key'


class InterestList(generics.ListCreateAPIView):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['author']


class InterestDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer


class LoginToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        result = super().post(request, *args, **kwargs)
        token = Token.objects.get(key=result.data['token'])
        update_last_login(None, token.user)
        return result
