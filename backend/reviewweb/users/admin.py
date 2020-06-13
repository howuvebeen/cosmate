from django.contrib import admin
from .models import Profile, SkinIssue, SkinType

# Register your models here.
admin.site.register(Profile)
admin.site.register(SkinIssue)
admin.site.register(SkinType)
