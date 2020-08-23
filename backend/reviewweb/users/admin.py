from django.contrib import admin
from .models import Interest, Profile, SkinIssue, SkinType

# Register your models here.
admin.site.register(Profile)
admin.site.register(SkinIssue)
admin.site.register(SkinType)
admin.site.register(Interest)
