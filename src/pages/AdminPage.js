import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '', child: '', teen: '', adults: '', senior: '', ratings: '',
        description: '', Enter: '', Return: '', stock: '',
        images: [{ image: '' }], Hotels: '', Places: ''
    });
    const [editingProduct, setEditingProduct] = useState(null);

    // Fetch all products
    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/admin/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "image") {
            setNewProduct({ ...newProduct, images: [{ image: value }] });
        } else {
            setNewProduct({ ...newProduct, [name]: value });
        }
    };

    // Add a new product
    const addProduct = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/v1/admin/products', newProduct);
            setProducts([...products, res.data.product]);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    // Delete a product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/admin/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.log(error.response.data);
        }
    };

    // Start editing a product
    const startEdit = (product) => {
        setEditingProduct(product);
        setNewProduct(product);
    };

    // Update a product
    const updateProduct = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/v1/admin/products/${editingProduct._id}`, newProduct);
            setProducts(products.map(p => (p._id === editingProduct._id ? res.data.updatedProduct : p)));
            setEditingProduct(null);
            setNewProduct({
                name: '', child: '', teen: '', adults: '', senior: '', ratings: '',
                description: '', Enter: '', Return: '', stock: '',
                images: [{ image: '' }], Hotels: '', Places: ''
            });
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div>
            <style>
                {`
                    body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      margin: 0;
                      padding: 0;
                    }

                    h2 {
                      text-align: center;
                      color: #333;
                      padding: 20px 0;
                    }

                    div.container {
                      max-width: 800px;
                      margin: auto;
                      background: white;
                      padding: 20px;
                      border-radius: 8px;
                      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    }

                    input {
                      width: 100%;
                      padding: 10px;
                      margin: 10px 0;
                      border: 1px solid #ccc;
                      border-radius: 5px;
                    }

                    button {
                      background-color: #28a745;
                      color: white;
                      border: none;
                      padding: 10px 15px;
                      margin: 10px 5px;
                      cursor: pointer;
                      border-radius: 5px;
                    }

                    button:hover {
                      opacity: 0.8;
                    }

                    button:nth-child(2) {
                      background-color: #007bff;
                    }

                    button:nth-child(3) {
                      background-color: #dc3545;
                    }

                    ul {
                      list-style: none;
                      padding: 0;
                    }

                    li {
                      background: #fff;
                      margin: 10px 0;
                      padding: 15px;
                      border-radius: 5px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }

                    strong {
                      color: #333;
                    }
                `}
            </style>

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
                    <button onClick={updateProduct}>Update Product</button>
                ) : (
                    <button onClick={addProduct}>Add Product</button>
                )}
            </div>

            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <strong>{product.name}</strong> - {product.description}
                        <button onClick={() => startEdit(product)}>Edit</button>
                        <button onClick={() => deleteProduct(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
