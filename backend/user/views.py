from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, throttle_classes, permission_classes
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from .serializers import (
    RegisterSerializer, 
    CustomerInfoSerializer
)
from movie.serializers import MovieSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from movie.models import Movie
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework.authtoken.models import Token

# Create your views here.

# liked movies
class LikedMovieAV(ListAPIView):
    def get_queryset(self):
        return self.request.user.customer.liked_movies.all()
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]

# like movie
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_movie(request, pk):
    movie = get_object_or_404(Movie, pk=pk)
    request.user.customer.liked_movies.add(movie)
    return Response(status=status.HTTP_202_ACCEPTED)

# unlike movie
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unlike_movie(request, pk):
    movie = get_object_or_404(Movie, pk=pk)
    request.user.customer.liked_movies.remove(movie)
    return Response(status=status.HTTP_202_ACCEPTED)

# @api_view(['POST'])
# def register_view(request):
#     serializer = RegisterSerializer(data=request.data)
#     if serializer.is_valid():
#         email = serializer.validated_data.get('email')
#         try:
#             validate_email(email)
#         except ValidationError:
#             return Response({'error': 'Invalid email format'}, status=status.HTTP_400_BAD_REQUEST)
        
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     else:
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# register

@api_view(['POST'])
# @throttle_classes([AnonRateThrottle, UserRateThrottle])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# login
@api_view(['POST'])
# @throttle_classes([AnonRateThrottle, UserRateThrottle])
def login_view(request):
    user_info = request.data.get('user_info')
    password = request.data.get('password')

    if '@' in user_info:
        user = User.objects.filter(email=user_info).first()
    else:
        user = User.objects.filter(username=user_info).first()
    if user and user.check_password(password):
        serializer = CustomerInfoSerializer(instance=user.customer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(data={'message':'User info or password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
# @throttle_classes([AnonRateThrottle, UserRateThrottle])
def logout_view(request):
    try:
        # Get the user's token
        token = request.auth
        # Delete the token from the database
        Token.objects.filter(key=token).delete()
        return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": "An error occurred during logout."}, status=status.HTTP_400_BAD_REQUEST)
