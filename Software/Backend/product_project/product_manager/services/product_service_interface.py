from abc import ABC, abstractmethod

class ProductServiceInterface(ABC):

    @abstractmethod
    def list_products(self):
        pass

    @abstractmethod
    def get_product(self, product_id):
        pass

    @abstractmethod
    def create_product(self, data):
        pass

    @abstractmethod
    def update_product(self, product_id, data):
        pass

    @abstractmethod
    def delete_product(self, product_id):
        pass
