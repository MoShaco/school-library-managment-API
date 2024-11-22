from django.urls import path
from . import views


urlpatterns = [
    path('authors', views.AuthorsView.as_view()),
    path('authors/<int:pk>', views.AuthorView.as_view()),
    path('categories', views.CategoriesView.as_view()),
    path('categories/<int:pk>', views.CategoryView.as_view()),
    path('books', views.BooksView.as_view()),
    path('books/<int:pk>', views.BookView.as_view())
]