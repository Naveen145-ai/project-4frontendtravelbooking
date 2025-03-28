import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cart({ cartItems, setCartItems }) {
    const [complete, setComplete] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.qty;
        });
        setTotalAmount(total.toFixed(2));
    }, [cartItems]);

    function increaseQty(item) {
        if (item.product.stock === item.qty) return;

        const updatedItems = cartItems.map((i) => {
            if (i.product._id === item.product._id && i.category === item.category) {
                return { ...i, qty: i.qty + 1 };
            }
            return i;
        });
        setCartItems(updatedItems);
    }

    function decreaseQty(item) {
        if (item.qty > 1) {
            const updatedItems = cartItems.map((i) => {
                if (i.product._id === item.product._id && i.category === item.category) {
                    return { ...i, qty: i.qty - 1 };
                }
                return i;
            });
            setCartItems(updatedItems);
        }
    }

    function removeItem(item) {
        const updatedItems = cartItems.filter((i) => !(i.product._id === item.product._id && i.category === item.category));
        setCartItems(updatedItems);
    }

    /*function placeOrder() {
        if (!cartItems || cartItems.length === 0) {
            alert("Cart is empty!");
            return;
        }
    
        fetch('http://localhost:5000/api/v1/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartItems)  // ✅ Send as an array (matches backend)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setCartItems([]);
                setComplete(true);
                alert("Order placed successfully!");  // Or use toast
            } else {
                alert(`Order failed: ${data.message}`);
            }
        })
        .catch(error => {
            console.error("Order error:", error);
            alert("Something went wrong. Please try again.");
        });
    }*/
    

    
    function placeOrder() {
        
        
        fetch('http://localhost:5000/api/v1/order', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cartItems)
        })
        .then((res) => { 
            console.log(res);
            setCartItems([]); 
            setComplete(true);
            //toast.success("Order Success!")
        })
    }

    return cartItems.length > 0 ? (
        <Fragment>
            <div className="container container-fluid">
                <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8">
                        {cartItems.map((item, index) => (
                            <Fragment key={index}>
                                <hr />
                                <div className="cart-item">
                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img 
                                                src={item.product.images?.[0]?.image || ''} 
                                                alt={item.product.name} 
                                                height="90" width="115" 
                                            />
                                        </div>

                                        <div className="col-5 col-lg-3">
                                            <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                                            <p><b>Category:</b> {item.category}</p>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">${(item.price * item.qty).toFixed(2)}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <div className="stockCounter d-inline">
                                                <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                                                <input type="number" className="form-control count d-inline" value={item.qty} readOnly />
                                                <span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                                            </div>
                                        </div>

                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <i className="fa fa-trash btn btn-danger" onClick={() => removeItem(item)}></i>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </Fragment>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="col-12 col-lg-4 mt-5">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p><b>Total:</b> <span className="order-summary-values">${totalAmount}</span></p>
                            <hr />
                            <button 
                                className="btn btn-primary btn-block" 
                                onClick={placeOrder} 
                                disabled={cartItems.length === 0}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (!complete ? <h2 className="mt-5">Your Cart is Empty!</h2> : <h2 className="mt-5">Order Placed Successfully!</h2>);
} 
