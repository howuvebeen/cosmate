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


# Create your views here.


class UserList(APIView):
    """
    List all Users
    """

    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    List/Update/Delete specific User
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileList(APIView):
    """
    List all Profiles
    """

    def get(self, request, format=None):
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    List/Update/Delete specific Profile
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


# class ProfileDetail2(APIView):
#     """
#     Retrieve, update or delete a profile instance.
#     """

#     def get_object(self, pk):
#         try:
#             return Profile.objects.get(pk=pk)
#         except Profile.DoesNotExist:
#             raise Http404

#     def get(self, request, pk, format=None):
#         snippet = self.get_object(pk)
#         serializer = ProfileSerializer(snippet)
#         return Response(serializer.data)

#     def put(self, request, pk, format=None):
#         snippet = self.get_object(pk)
#         serializer = ProfileSerializer(snippet, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk, format=None):
#         snippet = self.get_object(pk)
#         snippet.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
