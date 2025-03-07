import  { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
export default function ProductDetail({cartItems, setCartItems}) {
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const {id} = useParams();

    
    useEffect(() => {  
      fetch(`http://localhost:5000/api/v1`+'/product/'+id)
      .then(res => res.json())
      .then( res => setProduct(res.product))
  },[])

  function addToCart(){
    const itemsExist = cartItems.find((item) => item.product._id == product._id)
    if (!itemsExist) {
        const newItem = {product, qty};
    setCartItems((state) => [...state, newItem]);
    toast.success("Ticket Item added to cart successfully!")
     }
        }

  function increaseQty(){
      if(product.stock == qty){
          return;
      }
      setQty((state) => state + 1)
  }

  function decreaseQty(){
      if(qty > 1){
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

                   
                    <div className="rating">
    {[...Array(5)].map((_, i) => {
        const rating = Number(product.ratings) || 0; 
        if (i < Math.floor(rating)) {
            return <i key={i} className="fas fa-star" style={{ color: 'gold', fontSize: '20px' }} />;
        } else if (i === Math.floor(rating) && rating % 1 !== 0) {
            return <i key={i} className="fas fa-star-half-alt" style={{ color: 'gold', fontSize: '20px' }} />;
        } else {
            return <i key={i} className="far fa-star" style={{ color: 'gold', fontSize: '20px' }} />;
        }
    })}
    <span className="ml-2">({Number(product.ratings).toFixed(1)})</span>
</div>
                    <hr />
                    <p id="product_price">${product.price}(per adult)</p>

                    
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus mx-2" onClick={decreaseQty}>-</span>
                        <span className="btn btn-light">{qty}</span>
                        <span className="btn btn-primary plus mx-2" onClick={increaseQty}>+</span>
                    </div>
                    <hr />
                    <button 
                        type="button" 
                        onClick={addToCart} 
                        disabled={product.stock == 0} 
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
                </div>
            </div>
        </div>
    );
}
