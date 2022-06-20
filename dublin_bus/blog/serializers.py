from rest_framework import serializers
from .models import Blog

class BasicBlogSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Blog
        fields = '__all__'


class BlogDetailSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Blog
        fields = '__all__'