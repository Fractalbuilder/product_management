import React, { useState } from "react";

const ProductsTable = ({ products, onDelete, onEdit }) => {
  const [editingProduct, setEditingProduct] = useState(null);

  const handleSaveEdit = (id) => {
    const updatedProduct = {
      name: editingProduct.name,
      category: editingProduct.category,
      price: editingProduct.price,
      description: editingProduct.description,
    };
    onEdit(id, updatedProduct);
    setEditingProduct(null);
  };

  return (
    <>
      {products.length > 0 ? (
        <table className="table-full-width"> {/* Apply the CSS class here */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                {editingProduct && editingProduct.id === product.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            name: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editingProduct.category}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            category: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            price: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            description: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <button className="common-button" onClick={() => handleSaveEdit(product.id)}>
                        Save
                      </button>
                      &nbsp;
                      <button className="common-button" onClick={() => setEditingProduct(null)}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>
                      <button className="common-button" onClick={() => setEditingProduct(product)}>
                        Edit
                      </button>
                      &nbsp;
                      <button className="common-button" onClick={() => onDelete(product.id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="common-text">No products yet</p>
      )}
    </>
  );
};

export default ProductsTable;
