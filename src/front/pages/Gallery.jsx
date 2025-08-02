import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Gallery.css";

const images = [
  { src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80", text: "Corte clásico" },
  { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80", text: "Diseño moderno" },
  { src: "https://images.unsplash.com/photo-1700760934268-8aa0ef52ce0a?q=80", text: "Afeitado profesional" },
  { src: "https://plus.unsplash.com/premium_photo-1661493935776-a76a3e33dddf?q=80", text: "Estilo degradado" },
  { src: "https://images.unsplash.com/photo-1568339434343-2a640a1a9946?q=80", text: "Corte juvenil" },
  { src: "https://images.unsplash.com/photo-1593702288056-7927b442d0fa?q=80", text: "Peinado elegante" },
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setFlippedIndex(null);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setFlippedIndex(null);
  };

  const handleFlip = (index) => {
    setFlippedIndex(index === flippedIndex ? null : index);
  };

  // Cierra la carta si clicas fuera
  useEffect(() => {
    const handleClickOutside = () => setFlippedIndex(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Evita que al hacer clic en la carta se cierre inmediatamente
  const handleCardClick = (e, index) => {
    e.stopPropagation();
    handleFlip(index);
  };

  const visibleImages = 4;
  const displayedImages = [];
  for (let i = 0; i < visibleImages; i++) {
    displayedImages.push(images[(currentIndex + i) % images.length]);
  }

  return (
    <div className="carousel-wrapper">
      <h2 className="gallery-title">Gallery</h2>
      <div className="carousel-container">
        <div className="carousel-arrow left" onClick={handlePrev}>
          <FaChevronLeft />
        </div>
        {displayedImages.map((img, idx) => {
          const globalIndex = (currentIndex + idx) % images.length;
          return (
            <div
              key={globalIndex}
              className={`carousel-card ${
                flippedIndex === globalIndex ? "flipped" : ""
              }`}
              onClick={(e) => handleCardClick(e, globalIndex)}
            >
              <div className="card-inner">
                <div className="card-front">
                  <img src={img.src} alt={`Card ${globalIndex}`} className="carousel-image" />
                </div>
                <div className="card-back">
                  <p>{img.text}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="carousel-arrow right" onClick={handleNext}>
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Gallery;