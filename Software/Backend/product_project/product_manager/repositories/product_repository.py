from .product_repository_interface import ProductRepositoryInterface
from ..models.product import Product

class ProductRepository(ProductRepositoryInterface):

    def get_all(self):
        return Product.objects.all()

    def get_by_id(self, product_id):
        return Product.objects.get(id=product_id)

    def create(self, data):
        return Product.objects.create(**data)

    def update(self, product_id, data):
        product = Product.objects.get(id=product_id)

        for key, value in data.items():
            setattr(product, key, value)
        product.save()
        
        return product

    def delete(self, product_id):
        product = Product.objects.get(id=product_id)
        product.delete()
