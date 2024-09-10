from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import authenticate
from django_redis import get_redis_connection
from .serializers import ProductSerializer, UserSerializer
from .services.product_service import ProductService
from .repositories.product_repository import ProductRepository
from rest_framework.decorators import api_view

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
    
        try:
            user = authenticate(username=username, password=password)
            
            if user is not None:
                refresh_token = RefreshToken.for_user(user)
                refresh_token['username'] = user.username
                refresh_str = str(refresh_token)
                access_str = str(refresh_token.access_token)

                user_id = refresh_token['user_id']
                redis_conn = get_redis_connection('default')
                redis_conn.set(f"refresh_user_{user_id}", refresh_str)

                return Response({
                    'refresh': refresh_str,
                    'access': access_str
                }, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            
        except Exception:
            return Response({"error: ": "The process failed contact the administrator"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RefreshSessionView(APIView):
    def post(self, request):
        refresh_input = request.data.get('refresh')

        try:
            old_refresh_token = RefreshToken(refresh_input)
            old_refresh_token.check_exp()
            user_id = old_refresh_token['user_id']
            username = old_refresh_token['username']

            redis_conn = get_redis_connection('default')
            stored_refresh = redis_conn.get(f"refresh_user_{user_id}")
            
            if stored_refresh and stored_refresh.decode() == old_refresh_token.token:
                new_refresh_token = RefreshToken()
                new_refresh_token['user_id'] = user_id
                new_refresh_token['username'] = username
                new_access_token = new_refresh_token.access_token
                new_refresh_str = str(new_refresh_token)
                new_access_str = str(new_access_token)
                redis_conn.set(f"refresh_user_{user_id}", new_refresh_str)
                
                return Response({
                    'refresh': new_refresh_str,
                    'access': str(new_access_str)
                }, status=status.HTTP_200_OK)
            
            raise ValueError("Invalid refresh token")
        
        except TokenError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception:
            return Response({"error: ": "The process failed contact the administrator"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class ProductView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated] 

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.product_service = ProductService(ProductRepository())


    def get(self, request, product_id=None):
        try:
            if product_id:
                product = self.product_service.get_product(product_id)
                serializer = ProductSerializer(product)

                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                products = self.product_service.list_products()
                serializer = ProductSerializer(products, many=True)

                return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception:
            return Response({"error: ": "The process failed contact the administrator"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def post(self, request):
        serializer = ProductSerializer(data=request.data)

        try:
            if serializer.is_valid():
                product = self.product_service.create_product(serializer.validated_data)

                return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response({"error: ": "The process failed contact the administrator"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def put(self, request, product_id):
        try:
            serializer = ProductSerializer(data=request.data)

            if serializer.is_valid():
                product = self.product_service.update_product(product_id, serializer.validated_data)

                return Response(ProductSerializer(product).data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception:
            return Response({"error: ": "The process failed contact the administrator"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def delete(self, request, product_id):
        try:
            self.product_service.delete_product(product_id)

            return Response(status=status.HTTP_204_NO_CONTENT)

        except Exception:
            return Response({"error: ": "The process failed contact the administrator"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh_token = RefreshToken.for_user(user)
            refresh_token['username'] = user.username
            refresh_str = str(refresh_token)
            access_str = str(refresh_token.access_token)

            user_id = refresh_token['user_id']
            redis_conn = get_redis_connection('default')
            redis_conn.set(f"refresh_user_{user_id}", refresh_str)

            return Response({
                'refresh': refresh_str,
                'access': access_str
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)