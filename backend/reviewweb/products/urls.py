

from django.urls import path, include, re_path
from products import views

urlpatterns = [
    path('', views.api_root),
    path('products/', views.ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', views.ProductDetail.as_view(), name='product-detail'),
]
