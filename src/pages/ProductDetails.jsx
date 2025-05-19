import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import axiosInstance from '../apis/config';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import "../LoadingScreen.css"
import { toast } from 'react-toastify';



export default function ProductDetails() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (isAuthenticated) {
      
      dispatch(addToCart(product));
      toast.success(`Successfully added to cart! 🛒`, {
        position: 'top-left',})
        setAdded(true);           
        setTimeout(() => setAdded(false), 1500);  
      }else{
         toast.info('Please login to add products to cart. 🛍️', {
                position: 'top-left',})
      }
      
  }

  const [quantity ,setQuantity] = useState(1)
  


  const params = useParams();

  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/products/${params.id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [params.id]);
  
  const [mainImage, setMainImage] = useState(null);

 useEffect(() => {
  if (product && product.thumbnail) {
    setMainImage(product.thumbnail);
  }
}, [product]);

  const [isWishlisted, setIsWishlisted] = useState(false);

    
  if (!product) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <div id='loaderParent'>

      <div className="loader">
  <div className="inner one"></div>
  <div className="inner two"></div>
  <div className="inner three"></div>
      </div>
     </div>

    </div>;
  }


   const rating = (
    <span>
      {Array.from({ length: 5 }, (_, i) =>
        i < Math.round(product.rating) ? (
          <span key={i} style={{ color: '#ffc107' }}>★</span>
        ) : (
          <span key={i} style={{ color: '#e4e5e9' }}>☆</span>
        )
      )}
    </span>
  );
  const status = product.stock === 0 ? 'Out of Stock' : 'In Stock'

  

  const stock = product.stock

  const handleIncrement = () => {
    setQuantity(prev => (prev < stock ? prev + 1 : stock ));
  };

  const handleDecreament = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  }

  return (
    <div className='bg-white p-5 rounded-4 border border-2'> 
      <div className='row'>
        <div className='col-12 col-md-4'>
          <img src={mainImage} alt={product.title} className='w-100'/>
          <div className='d-flex g-4'>
            {product.images && product.images.map((thumb, idx) => (
              <img
                key={idx}
                src={thumb}
                alt={`Thumbnail ${idx + 1}`}
                className='w-25'
                style={{ cursor: 'pointer', border: mainImage === thumb ? '2px solid #007bff' : 'none' }}
                onClick={() => setMainImage(thumb)}
              />
            ))}
          </div>
        </div>
        <div className='col-12 col-md-8'>
          <div className="d-flex align-items-center justify-content-between">
            <h2 className='py-4 fw-bold mb-0'>{product.title}</h2>
            <span
              style={{ cursor: 'pointer', fontSize: '2rem', color: isWishlisted ? 'gold' : 'gray', transition: 'color 0.2s' }}
              onClick={() => setIsWishlisted((prev) => !prev)}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWishlisted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="gold" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              )}
            </span>
          </div>
          <p className='text-muted fs-5'>{product.description}</p>
          <div >
            <span className='fs-5 fw-bold'>${product.price}</span>
          </div>
          <p>{rating}</p>
          <p className= {status === 'In Stock' ? 'btn p-1 fw-bold btn-success' : 'btn p-1 fw-bold btn-danger'}>{status}</p>

          <div className='d-flex gap-2 my-3'>
            {product.tags && product.tags.map((tag, idx) => (
              <span key={idx} className="badge bg-pink text-dark">{tag}</span>
            ))}
          </div>
            <div className='d-flex gap-4'>
              <span className='btn btn-outline-secondary fw-bolder' onClick={handleIncrement}>+</span>
              <span className='fs-4 fw-bolder'>{quantity}</span>
              <span className='btn btn-outline-secondary fw-bolder' onClick={handleDecreament}>-</span>
              <div className='d-flex flex-column'>
              <span>Only <span className='text-danger fw-bold'>{stock - quantity} pieces</span> left</span>
              <span className='fw-bold'>Don't miss it</span>

              </div>
            </div>
          
            <div className='d-flex justify-content-center gap-4'>
          <button className='btn btn-success mt-5 fw-bolder px-5 py-2 rounded-4'>Buy Now</button>
          <button className={`btn ${added ? 'btn-success' : 'btn-outline-success'} mt-5 fw-bolder px-5 py-2 rounded-4`} onClick={handleAddToCart}>{added ? '✔️ Added!' : 'Add To Cart'}</button>
            </div>
        </div>
      </div>
    </div>
  );
}
