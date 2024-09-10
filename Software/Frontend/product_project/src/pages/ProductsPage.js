import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from '../context/AuthContext'
import ProductsTable from "../components/ProductsTable";
import ProductForm from "../components/ProductForm";
import useAxios from '../utils/useAxios'
import '../App.css';


const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false); 
  const { authTokens } = useContext(AuthContext); 
  let api = useAxios()

  useEffect(() => {
    getProducts()
  }, []);

  let getProducts = async() => {
    let response = await api.get('/products/')

    if(response && response.status === 200){
        setProducts(response.data)
        setLoading(false);
    }
  }

  let addProduct = async(newProduct) => {
    let response = await api.post('/products/', newProduct)

    if(response && response.status === 201){
        setProducts([...products, response.data]); 
        setIsCreating(false); 
    }
  }

  let editProduct = async(id, updatedProduct) => {
    let response = await api.put(`/products/${id}/`, updatedProduct)

    if(response && response.status === 200){
        const updatedProducts = products.map((product) =>
            product.id === id ? response.data : product
        );
        setProducts(updatedProducts);
    }
  }

  let removeProduct = async(id) => {
    let response = await api.delete(`/products/${id}/`)

    if(response && response.status === 204){
        setProducts(products.filter((product) => product.id !== id));
    }
  }

  const handleCreateProduct = (newProduct) => {
    addProduct(newProduct)
  };

  const handleDeleteProduct = (id) => {
    removeProduct(id)
  };

  const handleEditProduct = (id, updatedProduct) => {
    editProduct(id, updatedProduct)
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="main-container">
      <h1 className="title">Products</h1>
      <button className="common-button" onClick={() => setIsCreating(true)}>Create Product</button>

      {isCreating && (
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <ProductsTable
        products={products}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </div>
  );
};

export default ProductsPage;
