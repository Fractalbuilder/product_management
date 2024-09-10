from .product_service_interface import ProductServiceInterface

class ProductService(ProductServiceInterface):

    def __init__(self, product_repository):
        self.product_repository = product_repository

    def list_products(self):
        return self.product_repository.get_all()

    def get_product(self, product_id):
        return self.product_repository.get_by_id(product_id)

    def create_product(self, data):
        return self.product_repository.create(data)

    def update_product(self, product_id, data):
        return self.product_repository.update(product_id, data)

    def delete_product(self, product_id):
        self.product_repository.delete(product_id)
