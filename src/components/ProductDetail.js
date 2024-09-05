import React, {useContext} from 'react';
import{ CartContext} from '../context/CartContext';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import iphone15ProMaxImage from '../assets/images/1.jpg';
import iphone15Image from '../assets/images/2.png';
import galaxyJ2Prime from '../assets/images/3.png';
import vivoY11 from '../assets/images/4.jpeg';
import oppoA3 from '../assets/images/5.jpeg';
import redmiNote10 from '../assets/images/6.jpg';
import huaweiP30Lite from '../assets/images/7.png';  // Import image for product 7
import onePlus9Pro from '../assets/images/8.png';  // Import image for product 8
import nokia3310 from '../assets/images/9.png';  // Import image for product 9
import sonyXperiaZ5 from '../assets/images/10.png';
import galaxyS21Ultra from '../assets/images/11.png';  // New image for product 11
import lgG7ThinQ from '../assets/images/12.png';       // New image for product 12
import motorolaRazr from '../assets/images/13.png';    // New image for product 13
import pixel6Pro from '../assets/images/14.png';       // New image for product 14
import iphoneSE from '../assets/images/15.png';        // New image for product 15
import realmeGT from '../assets/images/16.png';        // New image for product 16
import asusRogPhone5 from '../assets/images/17.png';   // New image for product 17
import htcU12Plus from '../assets/images/18.png'; 

function ProductDetail() {
  const { id } = useParams();
  const { addToCart} = useContext(CartContext);
  // Dummy data for now - in a real app, you would fetch this from an API
  const products = [
    {
      id: 1,
      name: 'Điện thoại Iphone 15 Pro Max 256GB',
      image: iphone15ProMaxImage,
      description: 'The iPhone 15 Pro Max is Apples latest flagship smartphone, boasting a stunning 6.7-inch Super Retina XDR display with ProMotion technology for ultra-smooth scrolling. Powered by the A17 Bionic chip, it offers lightning-fast performance and improved energy efficiency.',
      originalPrice: '30.490.000',
    },
    // Add the rest of your products here...
    {
      id: 2,
      name: 'Điện thoại Iphone 15 128GB',
      image: iphone15Image,
      description: 'The iPhone 15 features a 6.1-inch Super Retina XDR display, A17 Bionic chip, and a dual-camera system. With 5G connectivity and improved battery life, it\'s designed for those who want high performance in a compact form factor.',
      originalPrice: '24.990.000',
    },
    {
      id: 3,
      name: 'Điện thoại Samsung Galaxy J2 Prime',
      image: galaxyJ2Prime,
      description: 'Samsung Galaxy J2 Prime is an affordable smartphone featuring a 5.0-inch display, a quad-core processor, and a 8MP rear camera. It\'s perfect for users who need basic functionality with a sleek design.',
      originalPrice: '2.490.000',
    },
    {
      id: 4,
      name: 'Điện thoại Vivo Y11',
      image: vivoY11,
      description: 'The Vivo Y11 comes with a 6.35-inch display, a dual-camera setup, and a 5000mAh battery, making it a great choice for users who want long battery life and decent photography on a budget.',
      originalPrice: '3.290.000',
    },
    {
      id: 5,
      name: 'Điện thoại OPPO A3',
      image: oppoA3,
      description: 'OPPO A3 is a stylish smartphone with a 6.2-inch display, a powerful octa-core processor, and a 16MP rear camera. It\'s designed for those who want a balance of performance and aesthetics.',
      originalPrice: '4.990.000',
    },
    {
      id: 6,
      name: 'Điện thoại Xiaomi Redmi Note 10',
      image: redmiNote10,
      description: 'The Xiaomi Redmi Note 10 features a 6.43-inch AMOLED display, Snapdragon 678 processor, and a 48MP quad-camera system. It offers great value with its impressive specs and modern design.',
      originalPrice: '5.490.000',
    },
    {
      id: 7,
      name: 'Điện thoại Huawei P30 Lite',
      image: huaweiP30Lite,
      description: 'Huawei P30 Lite offers a 6.15-inch display, triple-camera setup with a 48MP main sensor, and Kirin 710 processor. It\'s ideal for photography enthusiasts looking for a budget-friendly option.',
      originalPrice: '6.490.000',
    },
    {
      id: 8,
      name: 'Điện thoại OnePlus 9 Pro',
      image: onePlus9Pro,
      description: 'The OnePlus 9 Pro is a premium smartphone featuring a 6.7-inch Fluid AMOLED display, Snapdragon 888 processor, and Hasselblad-tuned quad-camera system. It\'s built for users who demand the best in performance and photography.',
      originalPrice: '18.990.000',
    },
    {
      id: 9,
      name: 'Điện thoại Nokia 3310',
      image: nokia3310,
      description: 'The Nokia 3310 is a classic feature phone with a modern twist. It offers long battery life, a durable design, and the nostalgic Snake game, perfect for those seeking a simple, reliable phone.',
      originalPrice: '1.290.000',
    },
    {
      id: 10,
      name: 'Điện thoại Sony Xperia Z5',
      image: sonyXperiaZ5,
      description: 'Sony Xperia Z5 features a 5.2-inch display, Snapdragon 810 processor, and a 23MP camera with advanced autofocus. It\'s a great choice for photography enthusiasts who also value performance.',
      originalPrice: '7.990.000',
    },
    {
      id: 11,
      name: 'Điện thoại Samsung Galaxy S21 Ultra',
      image: galaxyS21Ultra,
      description: 'The Samsung Galaxy S21 Ultra is the ultimate smartphone with a 6.8-inch Dynamic AMOLED 2X display, Exynos 2100 processor, and a 108MP quad-camera setup. It\'s designed for those who want the best in every aspect of a smartphone.',
      originalPrice: '27.990.000',
    },
    {
      id: 12,
      name: 'Điện thoại LG G7 ThinQ',
      image: lgG7ThinQ,
      description: 'LG G7 ThinQ offers a 6.1-inch display, Snapdragon 845 processor, and AI-powered dual cameras. It\'s a solid choice for users who appreciate intelligent features and excellent audio quality.',
      originalPrice: '8.990.000',
    },
    {
      id: 13,
      name: 'Điện thoại Motorola Razr',
      image: motorolaRazr,
      description: 'Motorola Razr is a foldable smartphone with a 6.2-inch pOLED display and Snapdragon 710 processor. It combines the nostalgia of the original Razr with modern smartphone features.',
      originalPrice: '20.990.000',
    },
    {
      id: 14,
      name: 'Điện thoại Google Pixel 6 Pro',
      image: pixel6Pro,
      description: 'Google Pixel 6 Pro offers a 6.7-inch LTPO OLED display, Google Tensor chip, and an advanced camera system with AI-driven features. It\'s ideal for those who want the best of Google\'s software and hardware innovation.',
      originalPrice: '19.990.000',
    },
    {
      id: 15,
      name: 'Điện thoại iPhone SE 2022',
      image: iphoneSE,
      description: 'The iPhone SE 2022 features a 4.7-inch Retina HD display, A15 Bionic chip, and a 12MP camera. It\'s perfect for users who prefer a compact phone with top-notch performance.',
      originalPrice: '11.990.000',
    },
    {
      id: 16,
      name: 'Điện thoại Realme GT',
      image: realmeGT,
      description: 'Realme GT offers a 6.43-inch Super AMOLED display, Snapdragon 870 processor, and a 64MP triple-camera setup. It\'s a great option for those who want flagship performance at an affordable price.',
      originalPrice: '8.490.000',
    },
    {
      id: 17,
      name: 'Điện thoại ASUS ROG Phone 5',
      image: asusRogPhone5,
      description: 'ASUS ROG Phone 5 is a gaming powerhouse with a 6.78-inch AMOLED display, Snapdragon 888 processor, and a massive 6000mAh battery. It\'s built for serious gamers who need top-tier performance.',
      originalPrice: '24.990.000',
    },
    {
      id: 18,
      name: 'Điện thoại HTC U12+',
      image: htcU12Plus,
      description: 'HTC U12+ features a 6.0-inch display, Snapdragon 845 processor, and a dual-camera system with UltraSpeed autofocus. It\'s designed for users who value innovation and premium design.',
      originalPrice: '9.990.000',
    }
  ];

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="product-detail-image" />
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="product-detail-price">{product.originalPrice}đ</p>
        <p>{product.description}</p>
        <button onClick={() => addToCart(product)} className="add-to-cart-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
