from django.contrib import admin
from .models import Company, Ingredient, Category, Product

# Register your models here.

admin.site.register(Company)
admin.site.register(Ingredient)
admin.site.register(Category)
admin.site.register(Product)
