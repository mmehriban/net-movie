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

class PlaylistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Playlist
        fields = '__all__'        


class MovieSerializer(serializers.ModelSerializer):
    genre_info = GenreSerializer(many=True, source='genres', read_only =True)
    section_name = SectionSerializer(many=True, source ='sections', read_only =True)
    class Meta:
        model = Movie
        fields = '__all__'  
        extra_kwargs = {
            'genres': {'write_only': True},
            'sections': {'write_only': True},
        }         