from django.db.models import *
from storehub_api.models import Profiles
from storehub_api.serializers import *
from storehub_api.models import *
from rest_framework import permissions
from rest_framework import generics
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

# Importamos APIView para poder crear la vista de Registro 
from rest_framework.views import APIView
# ------------------------------------------------------------------------------

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                        context={'request': request})

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if user.is_active:

            roles = user.groups.all()
            role_names = []
            for role in roles:
                role_names.append(role.name)

            profile = Profiles.objects.filter(user=user).first()
            if not profile:
                return Response({},404)

            token, created = Token.objects.get_or_create(user=user)

            return Response({
                'id': user.pk,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'token': token.key,
                'roles': role_names,
                
                # Agregamos el rol del Profile para que Angular lo pueda validar
                'rol_perfil': profile.rol if hasattr(profile, 'rol') else 'cajero'
                # ---------------------------------------------------------------------------------------------
            })
        return Response({}, status=status.HTTP_403_FORBIDDEN)


class Logout(generics.GenericAPIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):

        print("logout")
        user = request.user
        print(str(user))
        if user.is_active:
            token = Token.objects.get(user=user)
            token.delete()

            return Response({'logout':True})

        return Response({'logout': False})


# =========================================================================
# Vista para manejar el Registro de Usuarios 
# =========================================================================
class RegistroView(APIView):
    # Permitimos que cualquiera pueda registrarse sin necesidad de tener un token previo
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # Llamamos al RegistroSerializer 
        serializer = RegistroSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response({"mensaje": "Usuario creado exitosamente."}, status=status.HTTP_201_CREATED)
        
        # Si ocurre un error regresa los detalles
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# =========================================================================

