from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from .models import Genre, Section, Movie, Playlist
from .serializers import GenreSerializer, PlaylistSerializer, MovieSerializer, SectionSerializer
from rest_framework import status, generics, parsers, permissions, pagination, filters
import datetime
from rest_framework.response import Response
from .filters import TrigramSimilarityFilter
from rest_framework.decorators import api_view, throttle_classes, permission_classes
# from django.contrib.postgres.search import TrigramSimilarity
from rest_framework.views import APIView
# Create your views here.

# genre
class GenreListAV(generics.ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class GenreDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer    

# playlist
class PlaylistAV(ListCreateAPIView):
    queryset = Playlist.objects.filter(hide=False)
    serializer_class = PlaylistSerializer

class PlaylistDetailAV(RetrieveUpdateDestroyAPIView):
    queryset = Playlist.objects.filter(hide=False)
    serializer_class = PlaylistSerializer     

# movie
class MovieListAV(generics.ListCreateAPIView):
    queryset = Movie.objects.all()  
    serializer_class = MovieSerializer
    # def get_queryset(self):
    #     queryset = super().get_queryset()
    #     search = self.request.query_params.get('search', None)
    #     if search:
    #         queryset = queryset.filter(title__icontains=search)
    #     return queryset

# search
class SearchMovieListAV(generics.ListCreateAPIView):
    queryset = Movie.objects.all()  
    serializer_class = MovieSerializer
    filter_backends = [TrigramSimilarityFilter] 
    search_fields = ['title', 'description']  # Add fields to search
    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('title', None)
        if search:
            queryset = queryset.filter(title__icontains=search)
        return queryset

# class SearchMovieListAV(APIView):
#     def get(self, request):
#         query = request.GET.get('movies-search')
#         if query:
#             movies = Movie.objects.annotate(
#                 similarity=TrigramSimilarity('title', query)
#             ).filter(similarity__gt=0.3).order_by('-similarity')
#             serializer = MovieSerializer(movies, many=True)
#             return Response(serializer.data)
#         return Response({"error": "No query provided"}, status=400)

# class SearchMovieListAV(generics.ListCreateAPIView):
#     queryset = Movie.objects.all()
#     serializer_class = MovieSerializer
    
#     def get_queryset(self):
#         qs = Movie.objects.all()
#         title = self.request.query_params.get('title')
#         if title is not None:
#             qs = qs.filter(title__icontains=title)
#         return qs


class MovieDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()  
    serializer_class = MovieSerializer 

# section 
class SectionListAV(generics.ListCreateAPIView):
    queryset = Section.objects.all()  
    serializer_class = SectionSerializer

class SectionDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = Section.objects.all()  
    serializer_class = SectionSerializer     