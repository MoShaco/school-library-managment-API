from django.db import models

# Create your models here.
class Author(models.Model):
    # Fields
    full_name = models.CharField(max_length=50)
    bio = models.CharField(max_length=255, blank=True, null=False)
    birth_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.full_name


class Category(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name="books")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="books")
    published_date = models.DateField(blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    points = models.DecimalField(max_digits=4, decimal_places=2)
    stock = models.SmallIntegerField(default=0)

    def __str__(self):
        return f"{self.title} by {self.author.full_name}"


