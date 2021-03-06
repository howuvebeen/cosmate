from django.shortcuts import render

from rest_framework import generics, permissions
from .models import Product, Company, Category1, Category2, Category3, Category4, Event, Banner, Instagram
from .serializers import ProductSerializer, CompanySerializer, Category1Serializer, Category2Serializer, Category3Serializer, Category4Serializer, EventSerializer, BannerSerializer, InstagramSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView

import django_filters

from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from reviews.permissions import IsAdminUserOrReadOnly


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'products': reverse('product-list', request=request, format=format)
    })


class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')
    class Meta:
        model = Product
        fields = [
            'name',
            'company',
            'category1',
            'category2',
            'category3',
            'category4',
            'skintype',
            'skinissue',
            'ingredients',
            'average_star', 
            'min_price',
            'max_price'
        ]


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
    filter_class = ProductFilter
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
                     'skintype__name', 'skinissue__name', 
                     'category1__name', 'category2__name', 'category3__name', 'category4__name'
                     ]


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
    # permission_classes = [IsAdminUserOrReadOnly]

    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View GET, PUT, DELETE request for retrieving, updating, and destroying
    specific company object
    """
    # permission_classes = [IsAdminUserOrReadOnly]

    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class Category1List(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating comapny and listing companies
    Companies can be categorized by pk, name, year, description,
    products
    """
    # permission_classes = [IsAdminUserOrReadOnly]

    queryset = Category1.objects.all()
    serializer_class = Category1Serializer

class Category1Detail(generics.RetrieveUpdateDestroyAPIView):
    """
    View with GET, PUT, PATCH, DELETE Request for specific category 1 type
    """

    queryset = Category1.objects.all()
    serializer_class = Category1Serializer

class Category2List(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating comapny and listing companies
    Companies can be categorized by pk, name, year, description,
    products
    """
    # permission_classes = [IsAdminUserOrReadOnly]

    queryset = Category2.objects.all()
    serializer_class = Category2Serializer

class Category2Detail(generics.RetrieveUpdateDestroyAPIView):
    """
    View with GET, PUT, PATCH, DELETE Request for specific category 2 type
    """

    queryset = Category2.objects.all()
    serializer_class = Category2Serializer

class Category3List(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating comapny and listing companies
    Companies can be categorized by pk, name, year, description,
    products
    """
    # permission_classes = [IsAdminUserOrReadOnly]

    queryset = Category3.objects.all()
    serializer_class = Category3Serializer

class Category3Detail(generics.RetrieveUpdateDestroyAPIView):
    """
    View with GET, PUT, PATCH, DELETE Request for specific category 3 type
    """

    queryset = Category3.objects.all()
    serializer_class = Category3Serializer

class Category4List(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating comapny and listing companies
    Companies can be categorized by pk, name, year, description,
    products
    """
    # permission_classes = [IsAdminUserOrReadOnly]

    queryset = Category4.objects.all()
    serializer_class = Category4Serializer

class Category4Detail(generics.RetrieveUpdateDestroyAPIView):
    """
    View with GET, PUT, PATCH, DELETE Request for specific category 4 type
    """

    queryset = Category4.objects.all()
    serializer_class = Category4Serializer

class EventList(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating and listing events
    """

    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View with GET, PUT, PATCH, DELETE Request for specific Event
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class BannerList(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating and listing banners
    """
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer

class BannerDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View with GET, PUT, PATCH, DELETE Request for specific Banner
    """
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer

class InstagramList(generics.ListCreateAPIView):
    """
    View with POST, GET request for creating and listing instagram posts
    """
    queryset = Instagram.objects.all().order_by('-upload_date')[:12]
    serializer_class = InstagramSerializer

class InstagramDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View with GET, PUT, PATCH, DELETE Request for specific Banner
    """
    queryset = Instagram.objects.all()
    serializer_class = InstagramSerializer

