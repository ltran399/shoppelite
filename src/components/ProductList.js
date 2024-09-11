import React from 'react';
import ProductItem from './ProductItem';
import './ProductList.css';
import iphone15ProMaxImage from '../assets/images/1.jpg';
import iphone15Image from '../assets/images/2.png';
import galaxyJ2Prime from '../assets/images/3.png';
import vivoY11 from '../assets/images/4.jpeg';
import oppoA3 from '../assets/images/5.jpeg';
import redmiNote10 from '../assets/images/6.jpg';
import huaweiP30Lite from '../assets/images/7.png';
import onePlus9Pro from '../assets/images/8.png';
import nokia3310 from '../assets/images/9.png';
import sonyXperiaZ5 from '../assets/images/10.png';
import galaxyS21Ultra from '../assets/images/11.png';
import lgG7ThinQ from '../assets/images/12.png';
import motorolaRazr from '../assets/images/13.png';    // New image for product 13
import pixel6Pro from '../assets/images/14.png';       // New image for product 14
import iphoneSE from '../assets/images/15.png';        // New image for product 15
import realmeGT from '../assets/images/16.png';        // New image for product 16
import asusRogPhone5 from '../assets/images/17.png';   // New image for product 17
import htcU12Plus from '../assets/images/18.png';      // New image for product 18

function ProductList({ searchTerm }) {
  const products = [
    { id: 1, name: 'Điện thoại Iphone 15 Pro Max 256GB', image: iphone15ProMaxImage, originalPrice: '30.490.000' },
    { id: 2, name: 'Điện thoại Iphone 15 128GB', image: iphone15Image, originalPrice: '20.990.000' },
    { id: 3, name: 'Điện thoại Giá Rẻ Samsung Galaxy J2 Prime', image: galaxyJ2Prime, originalPrice: '2.490.000' },
    { id: 4, name: 'Điện thoại Vivo Y11', image: vivoY11, originalPrice: '3.290.000' },
    { id: 5, name: 'Điện thoại Oppo A3s', image: oppoA3, originalPrice: '400.000' },
    { id: 6, name: 'Điện thoại Xiaomi Redmi Note 10', image: redmiNote10, originalPrice: '5.990.000' },
    { id: 7, name: 'Điện thoại Huawei P30 Lite', image: huaweiP30Lite, originalPrice: '6.500.000' },
    { id: 8, name: 'Điện thoại OnePlus 9 Pro', image: onePlus9Pro, originalPrice: '15.990.000' },
    { id: 9, name: 'Điện thoại Nokia 3310', image: nokia3310, originalPrice: '1.200.000' },
    { id: 10, name: 'Điện thoại Sony Xperia Z5', image: sonyXperiaZ5, originalPrice: '7.500.000' },
    { id: 11, name: 'Điện thoại Samsung Galaxy S21 Ultra', image: galaxyS21Ultra, originalPrice: '24.990.000' },
    { id: 12, name: 'Điện thoại LG G7 ThinQ', image: lgG7ThinQ, originalPrice: '5.490.000' },
    {
      id: 13,
      name: 'Điện thoại Motorola Razr',
      image: motorolaRazr,
      originalPrice: '29.990.000',
    },
    {
      id: 14,
      name: 'Điện thoại Google Pixel 6 Pro',
      image: pixel6Pro,
      originalPrice: '19.990.000',
    },
    {
      id: 15,
      name: 'Điện thoại iPhone SE 2020',
      image: iphoneSE,
      originalPrice: '10.990.000',
    },
    {
      id: 16,
      name: 'Điện thoại Realme GT',
      image: realmeGT,
      originalPrice: '11.490.000',
    },
    {
      id: 17,
      name: 'Điện thoại Asus ROG Phone 5',
      image: asusRogPhone5,
      originalPrice: '21.990.000',},
    {
      id: 18,
      name: 'Điện thoại HTC U12 Plus',
      image: htcU12Plus,
      originalPrice: '8.990.000',
    },
  ];

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list-container">
      <div className="product-list">
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;