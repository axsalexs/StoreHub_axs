from rest_framework import viewsets, permissions
from storehub_api.models import Categorias, Productos
from storehub_api.serializers import CategoriasSerializer, ProductosSerializer

# Vista para Categorías 
class CategoriasViewSet(viewsets.ModelViewSet):
    queryset = Categorias.objects.all()
    serializer_class = CategoriasSerializer
    # Solo el administrador puede modificar categorias
    permission_classes = [permissions.IsAuthenticated]

# Vista para Productos 
class ProductosViewSet(viewsets.ModelViewSet):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer
    # Solo el administrador puede modificar productos
    permission_classes = [permissions.IsAuthenticated]