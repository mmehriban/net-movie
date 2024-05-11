from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GENDER_CHOICES, Customer
from rest_framework.authtoken.models import Token
import re
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.http import JsonResponse


class RegisterSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(source='user.password', write_only=True)
    birthday = serializers.DateField(input_formats=['%Y.%m.%d'])
    gender = serializers.ChoiceField(choices=GENDER_CHOICES)
    token = serializers.SerializerMethodField(read_only=True)

    def create(self, validated_data):
        user_info = validated_data.pop('user')
        user = User.objects.create_user(**user_info)
        customer = Customer.objects.create(user = user, **validated_data)
        return customer

    def get_token(self, customer):
        token, created = Token.objects.get_or_create(user=customer.user)
        return token.key   
    
    def validate_email(self, value):
        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', value):
            raise serializers.ValidationError("Enter a valid email address.")
        
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email address is already in use.")
        return value    
    
    # def validate_email(self, value):
    #     if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', value):
    #         raise ValidationError("Enter a valid email address.")
    #     return value
    
class CustomerInfoSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    gender = serializers.ChoiceField(choices=GENDER_CHOICES)
    birthday = serializers.DateField(input_formats=['%Y.%m.%d'])
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Customer
        fields = ['id','first_name', 'last_name', 'username', 'email', 'birthday', 'gender', 'token']

    def get_token(self, customer):
        token, created = Token.objects.get_or_create(user=customer.user)
        return token.key    