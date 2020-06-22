from django.contrib import admin
from .models import Company, Ingredient, Category1, Category2, Category3, Category4, Product

# Register your models here.

admin.site.register(Company)
admin.site.register(Ingredient)
admin.site.register(Category1)
admin.site.register(Category2)
admin.site.register(Category3)
admin.site.register(Category4)
admin.site.register(Product)
