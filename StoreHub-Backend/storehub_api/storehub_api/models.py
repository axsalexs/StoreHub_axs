from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import AbstractUser, User
from django.conf import settings

class BearerTokenAuthentication(TokenAuthentication):
    keyword = "Bearer"

class Profiles(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profiles")
    
    # --- MODIFICACIÓN: Agregamos las opciones de roles y el campo rol ---
    ROLES = (
        ('admin', 'Administrador'),
        ('cajero', 'Cajero/Vendedor'),
    )
    rol = models.CharField(max_length=20, choices=ROLES, default='cajero')
    # --------------------------------------------------------------------
    
    creation = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    update = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"Perfil de {self.user.first_name} {self.user.last_name}"
    
# ==========================================================
# CATEGORÍAS (Modelo de catálogo)
# ==========================================================
class Categorias(models.Model):
    id = models.BigAutoField(primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    creation = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    update = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.nombre

# ==========================================================
# PRODUCTOS (Modelo central de inventario)
# ==========================================================
class Productos(models.Model):
    id = models.BigAutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)
    codigo_barras = models.CharField(max_length=50, unique=True)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2)
    costo_adquisicion = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    
    # Relación PROTECT: No permite borrar la categoría si tiene productos asignados
    categoria = models.ForeignKey(Categorias, on_delete=models.PROTECT, related_name='productos')
    activo = models.BooleanField(default=True)
    
    creation = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    update = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} - Stock: {self.stock}"