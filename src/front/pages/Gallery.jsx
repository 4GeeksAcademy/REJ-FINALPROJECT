import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Gallery.css";

const images = [
  { src: "https://picsum.photos/300/300?random=1", text: "Corte clásico" },
  { src: "https://picsum.photos/300/300?random=2", text: "Diseño moderno" },
  { src: "https://picsum.photos/300/300?random=3", text: "Afeitado profesional" },
  { src: "https://picsum.photos/300/300?random=4", text: "Estilo degradado" },
  { src: "https://picsum.photos/300/300?random=5", text: "Corte juvenil" },
  { src: "https://picsum.photos/300/300?random=6", text: "Peinado elegante" },
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