# Generated by Django 5.0.1 on 2024-02-18 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0008_alter_movie_release_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='release_date',
            field=models.DateField(default='2022-01-01'),
            preserve_default=False,
        ),
    ]