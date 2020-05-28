from django.shortcuts import render

from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from django.shortcuts import get_object_or_404


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'products': reverse('product-list', request=request, format=format)
    })


class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
