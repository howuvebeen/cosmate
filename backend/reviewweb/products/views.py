from django.shortcuts import render

from rest_framework import generics
from .models import Product, Company
from .serializers import ProductSerializer, CompanySerializer


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'products': reverse('product-list', request=request, format=format)
    })


class ProductList(generics.ListCreateAPIView):
    """
    View with POST request for creating product and listing products
    Products can be categorized by name, company, 
    category, skintype, skinshade, and ingredients
    """
    queryset = Product.objects.all().order_by('-average_star')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'name',
        'company',
        'category',
        'skintype',
        'skinshade',
        'ingredients',
        'average_star'
    ]


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific product object
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CompanyList(generics.ListCreateAPIView):
    """
    View with POST request for creating comapny and listing companies
    Companies can be categorized by pk, name, year, description,
    products
    """
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific company object
    """
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
