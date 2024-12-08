from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Author, Category, Book
from django.contrib.auth.models import User
from djoser.conf import settings


class UserCreateSerializer(BaseUserCreateSerializer):
    default_error_messages = {
        **BaseUserCreateSerializer.default_error_messages,  # Include parent error messages
        "password_mismatch": "The two password fields didn't match."  # Add custom error
    }
    
    re_password = serializers.CharField(style={"input_type": "password"})   
    class Meta(BaseUserCreateSerializer.Meta):
            fields = ['first_name', 'last_name', 'email', 'username', 'password', 're_password']
            extra_kwargs = {
                'first_name': {'required': True, 'allow_blank': False},
                'last_name': {'required': True, 'allow_blank': False},
                'email': {'required': True, 'allow_blank': False},
            }

    def validate(self, attrs):
        # self.fields.pop("re_password", None)  
        re_password = attrs.pop("re_password") 
        attrs = super().validate(attrs) 
        if attrs["password"] == re_password:
            self.fields.pop("re_password", None)  
            return attrs  
        else:
            self.fail("password_mismatch")

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'full_name', 'bio', 'birth_date']
    

    def validate(self, attrs):
        # Check the password match re-passowrd

        # Call the parent
        return super().val


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