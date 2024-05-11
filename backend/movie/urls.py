from django.urls import path
from . import views

urlpatterns = [
    path('genres/', views.GenreListAV.as_view(), name='genre-list'),
    path('genres/<int:pk>/', views.GenreDetailAV.as_view(), name='genre-detail'),
    path('playlist/', views.PlaylistAV.as_view(), name='play-list'),
    path('playlist/<int:pk>/', views.PlaylistDetailAV.as_view(), name='playlist-detail'),
    path('movies/', views.MovieListAV.as_view(), name='movie-list'),
    path('movies/<int:pk>/', views.MovieDetailAV.as_view(), name='movie-detail'),
    path('sections/', views.SectionListAV.as_view(), name='section-list'),

    

]

