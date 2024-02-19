from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from .models import Genre, Section, Movie, Playlist
from .serializers import GenreSerializer, PlaylistSerializer, MovieSerializer
from rest_framework import status, generics, parsers, permissions, pagination, filters
import datetime
from rest_framework.response import Response
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

class MovieDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()  
    serializer_class = MovieSerializer 