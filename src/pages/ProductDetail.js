import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function ProductDetail({ cartItems, setCartItems }) {
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("adult"); // Default to adult
    const { id } = useParams();

    useEffect(() => {  
        fetch(`http://54.221.83.251:4000/api/v1/product/${id}`)
            .then(res => res.json())
            .then(res => setProduct(res.product));
    }, [id]);

    function addToCart() {
        if (!product) return;
    
        const categoryPrices = {
            child: product.child,
            teen: product.teen,
            adult: product.adults,
            senior: product.senior,
        };
    
        const price = categoryPrices[selectedCategory];
    
        const itemsExist = cartItems.find(
            (item) => item.product._id === product._id && item.category === selectedCategory
        );
    
        if (!itemsExist) {
            const newItem = { product, qty, category: selectedCategory, price };
            setCartItems((state) => [...state, newItem]);
            toast.success("Ticket added to cart successfully!");
    
            // Show SweetAlert2 confirmation popup
            Swal.fire({
             
                text: 'Your ticket has been successfully added to the cart.',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 2000,
                showConfirmButton: false,
            });
        }
    }

    function increaseQty() {
        if (product.stock === qty) return;
        setQty((state) => state + 1);
    }

    function decreaseQty() {
        if (qty > 1) {
            setQty((state) => state - 1);
        }
    }

    return product && (
        <div className="container container-fluid">
            <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <img src={product.images[0].image} alt="Product" height="500" width="500" />
                    <div className="mt-4 text-center">
                        <h5>Date: <span>{product.Date}</span></h5>
                        <h5>Enter: <span>{product.Enter}</span></h5>
                        <h5>Return: <span>{product.Return}</span></h5>
                    </div>
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.name}</h3>
                    <hr />

                    {/* Category Selection Dropdown */}
                    <label><b>Select Category:</b></label>
                    <select className="form-control mb-3" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="child">Child (0-10 yrs) - ${product.child}</option>
                        <option value="teen">Teen (11-18 yrs) - ${product.teen}</option>
                        <option value="adult">Adult (18+ yrs) - ${product.adults}</option>
                        <option value="senior">Senior (60+ yrs) - ${product.senior}</option>
                    </select>

                    {/* Quantity Control */}
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus mx-2" onClick={decreaseQty}>-</span>
                        <span className="btn btn-light">{qty}</span>
                        <span className="btn btn-primary plus mx-2" onClick={increaseQty}>+</span>
                    </div>

                    <hr />
                    <button 
                        type="button" 
                        onClick={addToCart} 
                        disabled={product.stock === 0} 
                        id="cart_btn" 
                        className="btn btn-primary d-inline ml-4"
                    >
                        Book Now
                    </button>
                    <hr />
                    
                    <p>Status: 
                        <span id="stock_status" className={product.stock > 0 ? "text-success" : "text-danger"}>
                            {product.stock > 0 ? "Tickets Available" : "Tickets Sold"}
                        </span>
                    </p>
                    <hr />
                    <h4 className="mt-2">Description:</h4>
                    <p>{product.description}</p>
                    <a href="https://wa.me/+916379453853?text=I'm%20interested%20in%20to%chat" target="_blank" class="whatsapp-chat">
        <img src="/images/products/whatsApp.png" alt="whatsapp" width="70px"/>


    </a>   
                </div>
            </div>
        </div>
        
    );
}
