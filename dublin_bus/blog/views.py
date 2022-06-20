from .models import Blog
from django.views import View
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from blog.serializers import BasicBlogSerializer, BlogDetailSerializer
# Create your views here.

class BlogListView(APIView):
    '''Blog List View for Index/Create routes'''

    def get(self, request):
        blogs = Blog.objects.all()
        serialized_blog = BasicBlogSerializer(blogs, many=True)
        return Response(serialized_blog.data, status=status.HTTP_200_OK)

class BlogDetialView(RetrieveUpdateDestroyAPIView):
    '''show / delete / edit a blog'''
    queryset = Blog.objects.all()
    serializer_class = BlogDetailSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )