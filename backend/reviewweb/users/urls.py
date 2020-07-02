from django.urls import path, include, re_path
from users import views
from rest_framework.authtoken.views import ObtainAuthToken
from rest_registration.api.views import (
    register,
    verify_registration,
    send_reset_password_link,
    reset_password,
    logout,
    change_password,
    register_email,
    verify_email  
)

urlpatterns = [
    path('login/', views.LoginToken.as_view(), name='api_token_auth'),
    path('register/', register, name = 'register'),
    path('verify_registration/', verify_registration, name = 'verify_registration'),
    path('send_reset_password_link/', send_reset_password_link, name = 'send_reset_password_link'),
    path('reset_password/', reset_password, name = 'reset_password'),
    path('logout/', logout, name = 'logout'),
    path('change_password/', change_password, name = 'change_password'),
    path('register_email/', register_email, name = 'register_email'),
    path('verify_email/', verify_email, name = 'verify_email'),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('profiles/', views.ProfileList.as_view(), name='profile-list'),
    path('profiles/<int:pk>/', views.ProfileDetail.as_view(), name='profile-detail'),
    path('tokens/<key>/', views.TokenDetail.as_view(), name='token-list'),
    path('interests/', views.InterestList.as_view(), name='interest-list'),
    path('interests/<int:pk>', views.InterestDetail.as_view(), name='interest-detail')
]
