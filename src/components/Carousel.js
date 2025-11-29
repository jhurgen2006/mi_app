import React from "react";
import "../index-carousel.css";

const Carousel = ({ products }) => {
  // Selecciona solo 2 gorras para el carrusel
  const carouselProducts = products.filter(p => p.category === "gorras").slice(0, 2);

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">✨ Destacados ✨</h2>
      <div className="carousel-wrapper">
        {carouselProducts.map((product) => (
          <div key={product.id} className="carousel-item">
            <div className="carousel-img-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="carousel-img"
              />
            </div>
            <div className="carousel-info">
              <h3 className="carousel-name">{product.name}</h3>
              <p className="carousel-price">${product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
