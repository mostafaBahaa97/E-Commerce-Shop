import React, { useEffect, useState } from 'react'
import axiosInstance from '../apis/config'
import ProductCard from '../components/ProductCard'

export default function ProductList() {
  const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosInstance.get("/products", {
      params: {
        limit: 50
      },
      headers: {
        Authorization: "ACCESS_TOKEN"
      }
    }).then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err))
  }, [])
  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <div id='loaderParent'>
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
      </div>
    );
  }

  const productsPerPage = 12;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);





  const handleDeleteProduct = (id) => {
    console.log(id);
    const filteredProduct = products.filter((product) => product.id !== id);
    setProducts(filteredProduct);
  };
  return (
    <>

    <div className="d-flex justify-content-center m-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={` btn ${currentPage === i + 1 ? 'btn-light' : 'btn-outline-light'} mx-1`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {currentProducts.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard data={product} onDelete={handleDeleteProduct} />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn ${currentPage === i + 1 ? 'btn-light' : 'btn-outline-light'} mx-1`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>


    </>
  )
}
