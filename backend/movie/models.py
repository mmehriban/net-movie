from django.db import models

# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='toupload/images/')
    description = models.TextField()
    release_date = models.DateField(blank=True, null=True)
    imdb = models.IntegerField()
    playlists = models.ManyToManyField('movie.Playlist', blank=True, related_name='movies')
    video = models.FileField(upload_to='toupload/videos/', blank=True, null=True)
    section = models.ForeignKey('movie.Section', on_delete=models.CASCADE, null=True)
    genres = models.ManyToManyField('movie.Genre')


    def __str__(self):
        return self.title
    
class Genre(models.Model):
    title = models.CharField(max_length=50)
    updated = models.DateField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title   
 
class Section(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title
    
class Playlist(models.Model):
    title = models.TextField()
    featured = models.BooleanField(default=False)
    updated = models.DateField(auto_now = True)
    created = models.DateField(auto_now_add = True)
    hide = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    