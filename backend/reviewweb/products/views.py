from django.shortcuts import render

from rest_framework import generics, permissions
from .models import Product, Company, Category1, Category2, Category3, Category4
from .serializers import ProductSerializer, CompanySerializer, Category1Serializer, Category2Serializer, Category3Serializer, Category4Serializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView


from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from reviews.permissions import IsAdminUserOrReadOnly


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'products': reverse('product-list', request=request, format=format)
    })



class ProductList(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating product and listing products
    Products can be categorized by name, company, 
    categories, skintype, skinissue, and ingredients.
    Filtering by different category is possible.
    """
    # permission_classes = [IsAdminUserOrReadOnly]

    queryset = Product.objects.all().order_by('-rank_score')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = [
        'name',
        'company',
        'category1',
        'category2',
        'category3',
        'category4',
        'skintype',
        'skinissue',
        'ingredients',
        'average_star'
    ]
    ordering_fields = ['rank_score', 'average_star', 'review_number']


class ProductSearchList(generics.ListAPIView):
    """
    View with GET request for searching for products and listing products.
    """
    # permission_classes = [IsAdminUserOrReadOnly]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'company__name',
                     'skintype', 'skinissue', 
                     'category1__name', 'category2__name', 'category3__name', 'category4__name',
                     'ingredients__name']


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific product object
    """
    # permission_classes = [IsAdminUserOrReadOnly]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CompanyList(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating comapny and listing companies
    Companies can be categorized by pk, name, year, description,
    products
    """
    permission_classes = [IsAdminUserOrReadOnly]

    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific company object
    """
    permission_classes = [IsAdminUserOrReadOnly]

    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class Category1List(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating comapny and listing companies
    Companies can be categorized by pk, name, year, description,
    products
    """
    permission_classes = [IsAdminUserOrReadOnly]

    queryset = Category1.objects.all()
    serializer_class = Category1Serializer

class Category2List(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating comapny and listing companies
    Companies can be categorized by pk, name, year, description,
    products
    """
    permission_classes = [IsAdminUserOrReadOnly]

    queryset = Category2.objects.all()
    serializer_class = Category2Serializer

class Category3List(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating comapny and listing companies
    Companies can be categorized by pk, name, year, description,
    products
    """
    permission_classes = [IsAdminUserOrReadOnly]

    queryset = Category3.objects.all()
    serializer_class = Category3Serializer

class Category4List(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating comapny and listing companies
    Companies can be categorized by pk, name, year, description,
    products
    """
    permission_classes = [IsAdminUserOrReadOnly]

    queryset = Category4.objects.all()
    serializer_class = Category4Serializer
