from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profiles, Categorias, Productos 

# ==========================================
# CÓDIGO ORIGINAL 
# ==========================================
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email")

class ProfilesSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profiles
        fields = "__all__"

class RegistroSerializer(serializers.ModelSerializer):
    rol = serializers.ChoiceField(choices=Profiles.ROLES, write_only=True)
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "email", "password", "rol")

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value

    def create(self, validated_data):
        rol = validated_data.pop('rol')
        user = User.objects.create_user(**validated_data)
        Profiles.objects.create(user=user, rol=rol)
        return user

# ==========================================================
# Serializadores para Inventario 
# ==========================================================

class CategoriasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorias
        fields = "__all__"

class ProductosSerializer(serializers.ModelSerializer):
    # vemos el nombre de la categoría
    categoria_nombre = serializers.ReadOnlyField(source='categoria.nombre')

    class Meta:
        model = Productos
        fields = "__all__"