from django.contrib import admin
from .models import Company, Ingredient, Category, Product, Review, Like, Feedback, Comment

# Register your models here.
admin.site.register(Company)
admin.site.register(Ingredient)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Like)
admin.site.register(Feedback)
admin.site.register(Comment)

