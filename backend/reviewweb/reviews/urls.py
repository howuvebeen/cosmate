from django.urls import path, include, re_path
from reviews import views

urlpatterns = [
    path('', views.api_root),
    re_path('^reviews/(?P<product>.+)/$', views.ProductReviewList.as_view()),
    path('reviews/', views.ReviewList.as_view(), name='review-list'),
    path('reviews/<int:pk>/', views.ReviewDetail.as_view(), name='review-detail'),

    path('likes/', views.LikeList.as_view(), name='like-list'),
    path('likes/<int:pk>/', views.LikeDetail.as_view(), name='like-detail'),
]
