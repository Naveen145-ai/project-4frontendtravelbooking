import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '', child: '', teen: '', adults: '', senior: '', ratings: '',
    description: '', Enter: '', Return: '', stock: '',
    images: [{ image: '' }], Hotels: '', Places: '', Date: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products
  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/admin/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  // Fetch orders
  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/admin/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setNewProduct({ ...newProduct, images: [{ image: value }] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const addProduct = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/admin/products', newProduct);
      setProducts([...products, res.data.product]);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/admin/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const updateProduct = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/v1/admin/products/${editingProduct._id}`, newProduct);
      setProducts(products.map(p => (p._id === editingProduct._id ? res.data.updatedProduct : p)));
      setEditingProduct(null);
      setNewProduct({
        name: '', child: '', teen: '', adults: '', senior: '', ratings: '',
        description: '', Enter: '', Return: '', stock: '',
        images: [{ image: '' }], Hotels: '', Places: '', Date: ''
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <style>{`
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #e0eafc,rgb(13, 114, 255));
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 20px;
        }

        div.container {
          max-width: 600px;
          width: 90%;
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        input {
          width: 100%;
          padding: 12px;
          margin: 12px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          transition: border-color 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
        }

        button {
          padding: 12px 18px;
          margin: 10px 5px 0 0;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        button:hover {
          transform: scale(1.05);
        }

        button.edit {
          background-color: #007bff;
          color: white;
        }

        button.delete {
          background-color: #dc3545;
          color: white;
        }

        button.add {
          background-color: #28a745;
          color: white;
        }

        ul {
          list-style: none;
          padding: 0;
          margin-top: 20px;
        }

        li {
          background: #fefefe;
          margin: 15px auto;
          padding: 20px 30px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          max-width: 1000px;
          width: 95%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        li > .actions {
          margin-top: 15px;
          display: flex;
          gap: 10px;
        }

        strong {
          color: #333;
          font-size: 18px;
        }

        .section-title {
          margin-top: 50px;
          color: #2c3e50;
          text-align: center;
        }

        .order-item {
          background-color: #f0f8ff;
        }
      `}</style>

      <h2>Admin Dashboard - Manage Products</h2>

      <div className="container">
        <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleChange} />
        <input type="number" name="child" placeholder="Child Price" value={newProduct.child} onChange={handleChange} />
        <input type="number" name="teen" placeholder="Teen Price" value={newProduct.teen} onChange={handleChange} />
        <input type="number" name="adults" placeholder="Adult Price" value={newProduct.adults} onChange={handleChange} />
        <input type="number" name="senior" placeholder="Senior Price" value={newProduct.senior} onChange={handleChange} />
        <input type="number" name="ratings" placeholder="Ratings" value={newProduct.ratings} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} />
        <input type="text" name="Enter" placeholder="Enter Date" value={newProduct.Enter} onChange={handleChange} />
        <input type="text" name="Return" placeholder="Return Date" value={newProduct.Return} onChange={handleChange} />
        <input type="number" name="stock" placeholder="Stock" value={newProduct.stock} onChange={handleChange} />
        <input type="text" name="Hotels" placeholder="Hotels" value={newProduct.Hotels} onChange={handleChange} />
        <input type="text" name="Places" placeholder="Places" value={newProduct.Places} onChange={handleChange} />
        <input type="text" name="Date" placeholder="Date" value={newProduct.Date} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={newProduct.images[0].image} onChange={handleChange} />

        {editingProduct ? (
          <button className="add" onClick={updateProduct}>Update Product</button>
        ) : (
          <button className="add" onClick={addProduct}>Add Product</button>
        )}
      </div>

      <ul>
        {products.map(product => (
          <li key={product._id}>
            <div>
              <strong>{product.name}</strong> - {product.description}
            </div>
            <div className="actions">
              <button className="edit" onClick={() => startEdit(product)}>Edit</button>
              <button className="delete" onClick={() => deleteProduct(product._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Admin Order Viewing Section */}
      <h2 className="section-title">View Orders</h2>
      <ul>
        {orders.map(order => (
          <li className="order-item" key={order._id}>
            <div><strong>Order ID:</strong> {order._id}</div>
            <div><strong>User:</strong> {order.user?.name || 'Guest'}</div>
            <div><strong>Status:</strong> {order.status}</div>
            <div><strong>Total:</strong> ₹{order.totalPrice}</div>
            <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</div>
            <div><strong>Items:</strong>
              <ul>
                {order.orderItems.map((item, index) => (
                  <li key={index}>
                    {item.name} (x{item.quantity}) - ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
