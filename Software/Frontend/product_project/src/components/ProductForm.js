import React, { useState, useEffect } from "react";
import '../App.css';

const ProductForm = ({ initialProduct, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialProduct ? initialProduct.name : "");
  const [category, setCategory] = useState(
    initialProduct ? initialProduct.category : ""
  );
  const [price, setPrice] = useState(initialProduct ? initialProduct.price : "");
  const [description, setDescription] = useState(
    initialProduct ? initialProduct.description : ""
  );

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setCategory(initialProduct.category);
      setPrice(initialProduct.price);
      setDescription(initialProduct.description);
    }
  }, [initialProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      category,
      price,
      description,
    };
    onSubmit(newProduct);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="common-button" type="submit">Submit</button>
      <button className="common-button" type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default ProductForm;
