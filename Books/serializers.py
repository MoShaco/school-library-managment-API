from rest_framework import serializers
from .models import Author, Category, Book


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'full_name', 'bio', 'birth_date']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title']


class BookSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset = Category.objects.all(),
        source = 'category',
        write_only = True
    )
    author = serializers.SerializerMethodField(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset = Author.objects.all(),
        source = 'author',
        write_only = True
    )
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'author_id', 'category', 'category_id', 'published_date', 'description', 'points', 'stock']


    def get_category(self, obj):
        return {
            'id': obj.category.id,
            'title': obj.category.title
        }


    def get_author(self, obj):
        return {
            'id': obj.author.id,
            'name': obj.author.full_name,
            'bio': obj.author.bio
        }