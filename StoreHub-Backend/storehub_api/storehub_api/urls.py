from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter 
from .views.bootstrap import VersionView
from .views.auth import CustomAuthToken, Logout, RegistroView
from .views.inventario import CategoriasViewSet, ProductosViewSet 

#CONFIGURACION DE RUTAS
router = DefaultRouter()
router.register(r'categorias', CategoriasViewSet)
router.register(r'productos', ProductosViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/version/", VersionView.as_view(), name="api-version"),
    path("api/login/", CustomAuthToken.as_view(), name="api-login"),
    path("api/logout/", Logout.as_view(), name="api-logout"),
    path("api/registro/", RegistroView.as_view(), name="api-registro"),
    
    # Esto agrega automaticamente las rutas /api/categorias/ y /api/productos/
    path("api/", include(router.urls)), 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

#Comentario prueba2 git