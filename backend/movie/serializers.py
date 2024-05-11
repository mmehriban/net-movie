from rest_framework import serializers
from .models import (
    Genre,
    Movie,
    Section,
    Playlist
)
from user.serializers import CustomerInfoSerializer

# serializers here

class GenreSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Genre
        fields = ['title']
        # fields = [ 'id', 'title']
        # exclude = ['updated']

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['title']


class MovieSerializer(serializers.ModelSerializer):
    genre_info = GenreSerializer(many=True, source='genres', read_only =True)
    section_name = SectionSerializer(source='section', read_only=True)
    
    class Meta:
        model = Movie
        fields = '__all__'  
        extra_kwargs = {
            'genres': {'write_only': True},
            'section': {'write_only': True},
        }         

# class MoviePlaylistSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Movie
#         fields = ['title']

class PlaylistSerializer(serializers.ModelSerializer):
    movie_list = MovieSerializer(many=True, source='movies', read_only=True)
    class Meta:
        model = Playlist
        fields = '__all__'   
        # extra_kwargs = {
        #     'movies': {'write_only': True}
        # }        