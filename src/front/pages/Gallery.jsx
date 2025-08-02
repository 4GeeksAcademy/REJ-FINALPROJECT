import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Gallery.css";
import { MdContentCut } from "react-icons/md";

// Importar imágenes locales
import barber from "../assets/img/barber.jpg";
import face from "../assets/img/face.jpg";
import mancut from "../assets/img/mancut.jpg";
import menCut from "../assets/img/menCut.jpg";
import nail from "../assets/img/nail.jpg";
import women from "../assets/img/women.jpg";

const images = [
  { src: mancut, text: "Classic Man Cut" },
  { src: menCut, text: "Modern Design" },
  { src: barber, text: "Professional Shave" },
  { src: nail, text: "Nail Design" },
  { src: women, text: "Women Cut" },
  { src: face, text: "Face Massage" }
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

  useEffect(() => {
    const handleClickOutside = () => setFlippedIndex(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
<div style={{
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem 1rem",
  minHeight: "100vh"
}}>
  <Gallery />
</div>


export default Gallery;