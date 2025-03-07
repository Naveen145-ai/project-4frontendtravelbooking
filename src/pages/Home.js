import {Fragment, useEffect} from 'react'
import ProductCard from '../components/productCard'
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
export default function Home(){
  const [products, setProducts] = useState([]); 
  const [searchParams, setSearchParams] = useSearchParams() 


   
   useEffect(() => {
    fetch("http://localhost:5000/api/v1/products"+searchParams)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.products); 
        setProducts(res.products);
      });
  }, [searchParams]);
  


    return <Fragment>
            

    <h1 className="products_heading">TRAVEL BOOKING PORTAL</h1>

    <section id="products" className="container mt-5">
      <div className="row">  
      {products.map((product) => (
  <ProductCard key={product._id} product={product} />
))}



      </div>
      
    </section>

    </Fragment>
}