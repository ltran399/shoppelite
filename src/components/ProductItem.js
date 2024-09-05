import React from 'react';
import { Link } from 'react-router-dom';
import './ProductItem.css';

function ProductItem({ product }) {
  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">{product.originalPrice}đ</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;