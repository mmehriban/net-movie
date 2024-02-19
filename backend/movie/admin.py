from django.contrib import admin
from .models import Movie, Genre, Section, Playlist

# Register your models here.
admin.site.register(Movie)
admin.site.register(Genre)
admin.site.register(Section)
admin.site.register(Playlist)


