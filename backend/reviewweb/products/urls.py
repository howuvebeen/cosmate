

from django.urls import path, include, re_path
from products import views

urlpatterns = [
    path('', views.api_root),
    path('products/', views.ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', views.ProductDetail.as_view(), name='product-detail'),
    path('products-search/', views.ProductSearchList.as_view(),
         name='product-search'),
    path('companies/', views.CompanyList.as_view(), name='company-list'),
    path('companies/<int:pk>/', views.CompanyDetail.as_view(), name='company-detail'),
    path('category1/', views.Category1List.as_view(), name='category1-list'),
    path('category2/', views.Category2List.as_view(), name='category2-list'),
    path('category3/', views.Category3List.as_view(), name='category3-list'),
    path('category4/', views.Category4List.as_view(), name='category4-list')
]

