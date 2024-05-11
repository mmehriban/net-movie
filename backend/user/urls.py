from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),

    path('liked-movies/', views.LikedMovieAV.as_view(), name='liked-movies'),
    path('like-movie/<int:pk>/', views.like_movie, name='like-movie'),
    path('unlike-movie/<int:pk>/', views.unlike_movie, name='unlike-movie'),


]
