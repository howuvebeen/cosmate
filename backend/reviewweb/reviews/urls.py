from django.urls import path, include, re_path
from reviews import views

urlpatterns = [
    path('', views.api_root),
    path('reviews/', views.ReviewList.as_view(), name= 'review-list'),
    path('reviews/<int:pk>/', views.ReviewDetail.as_view, name= 'review-detail')
]

