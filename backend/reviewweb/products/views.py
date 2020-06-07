from django.shortcuts import render

from rest_framework import generics, permissions
from .models import Product, Company, Category
from .serializers import ProductSerializer, CompanySerializer, CategorySerializer


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'products': reverse('product-list', request=request, format=format)
    })


class ProductList(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating product and listing products
    Products can be categorized by name, company, 
    category, skintype, skinissue, and ingredients.
    Filtering by different category is possible.
    """
    permission_classes = [permissions.IsAdminUser]

    queryset = Product.objects.all().order_by('-rank_score')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'name',
        'company',
        'category',
        'skintype',
        'skinissue',
        'ingredients',
        'average_star'
    ]


class ProductSearchList(generics.ListAPIView):
    """
    View with GET request for searching for products and listing products.
    """
    permission_classes = [permissions.IsAdminUser]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'company__name',
                     'skintype', 'skinissue', 'category__name', 'ingredients__name']


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific product object
    """
    permission_classes = [permissions.IsAdminUser]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CompanyList(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating comapny and listing companies
    Companies can be categorized by pk, name, year, description,
    products
    """
    permission_classes = [permissions.IsAuthenticated]

    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific company object
    """
    permission_classes = [permissions.IsAdminUser]

    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CategoryList(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating comapny and listing companies
    Companies can be categorized by pk, name, year, description,
    products
    """
    permission_classes = [permissions.IsAdminUser]

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
