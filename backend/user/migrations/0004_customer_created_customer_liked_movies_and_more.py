# Generated by Django 5.0.1 on 2024-02-18 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0007_movie_playlists'),
        ('user', '0003_customer_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='created',
            field=models.DateField(auto_now_add=True, default='2000-10-10'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='liked_movies',
            field=models.ManyToManyField(blank=True, null=True, related_name='liked_movies', to='movie.movie'),
        ),
        migrations.AddField(
            model_name='customer',
            name='updated',
            field=models.DateField(auto_now=True),
        ),
    ]