from django.db import models


GENDER_CHOICES = [
    ['male', 'Male'],
    ['female', 'Female'],
]

# Create your models here.
class Director(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.PROTECT)

    def __str__(self):
        return self.user.username

class Customer(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.PROTECT)
    birthday = models.DateField()
    gender = models.CharField(max_length = 20, choices=GENDER_CHOICES)
    liked_movies = models.ManyToManyField('movie.Movie', related_name='liked_movies', blank=True)


    def __str__(self):
        return self.user.username

class Review(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    movie = models.ForeignKey('movie.Movie', on_delete=models.CASCADE)        
    point = models.IntegerField()
    comment = models.TextField()
    updated = models.DateField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.movie.title} - {self.customer.user.username}'
    