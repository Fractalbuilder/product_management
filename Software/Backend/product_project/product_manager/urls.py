from django.urls import path
from .views import LoginView, RefreshSessionView, ProductView, UserView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', RefreshSessionView.as_view(), name='token_refresh'),
    path('products/', ProductView.as_view()),
    path('products/<int:product_id>/', ProductView.as_view()),
    path('user/', UserView.as_view(), name='create_user'),
]
