from django.urls import path, include, re_path
from user import views
from rest_framework.authtoken.views import ObtainAuthToken

urlpatterns = [
    
    path('login/', ObtainAuthToken.as_view(), name='api_token_auth')
    path('', include('rest_registration.api.urls', 'views.api_root'))
]