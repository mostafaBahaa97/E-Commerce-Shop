import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';


export default function ProductCard(props) {
  const { data, onDelete } = props;
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(addToCart(data));
      toast.success(`Successfully added to cart! 🛒`, {
        position: 'top-left',
      })
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } else {
      toast.info('Please login to add products to cart. 🛍️', {
        position: 'top-left',
      })
    }
  }
  const rating = (
    <span>
      {Array.from({ length: 5 }, (_, i) =>
        i < Math.round(data.rating) ? (
          <span key={i} style={{ color: '#ffc107' }}>★</span>
        ) : (
          <span key={i} style={{ color: '#e4e5e9' }}>☆</span>
        )
      )}
    </span>

  );
  const naviagte = useNavigate();

  function handleNavigateToDetails(id) {
    naviagte(`/product-details/${id}`);
  }
  const statusClass =
    data.availabilityStatus === 'In Stock'
      ? 'badge m-2 bg-success'
      : 'badge m-2 bg-secondary';

  return (
    <>
      <div className="card h-100">
        <img src={data.thumbnail} className="card-img-top m-auto" style={{ width: '250px', height: "250px", objectFit: 'cover' }} alt="..." />
        <div className="card-body">
          <span className={statusClass}>{data.availabilityStatus} </span>

          <Link to={`/product-details/${data.id}`}>
            <h5 className="card-title fw-bold">{data.title}</h5>
          </Link>
          <p className="card-text">
            {data.description}
          </p>
          <div className='d-flex gap-2 '>
            {data.tags && data.tags.map((tag, idx) => (
              <span key={idx} className="badge bg-pink text-dark">{tag}</span>
            ))}
          </div>
        </div>
        <div className='d-flex justify-content-between p-2'>
          <span>{rating}</span>
          <span className='btn btn-outline-success fw-bold'>{data.price} $</span>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <div>
            <button
              className="btn btn-primary"
              onClick={() => handleNavigateToDetails(data.id)}
            >
              View
            </button>
            <button
              className="btn btn-danger mx-2"
              onClick={() => onDelete(data.id)}
            >
              Delete
            </button>
          </div>
          <button disabled={added} className={`btn ${added ? 'btn-success' : 'btn-outline-success'}`} onClick={handleAddToCart}>
            {added ? '✔️ Added!' : 'Add To Cart'}</button>
        </div>
      </div>
    </>
  )
}
