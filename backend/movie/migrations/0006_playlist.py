# Generated by Django 5.0.1 on 2024-02-18 08:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0005_alter_movie_video'),
    ]

    operations = [
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('featured', models.BooleanField(default=False)),
                ('updated', models.DateField(auto_now=True)),
                ('created', models.DateField(auto_now_add=True)),
                ('hide', models.BooleanField(default=False)),
            ],
        ),
    ]
