import React, { useState } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const works = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1170&auto=format&fit=crop",
      title: "Artistic Nail Design",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1170&auto=format&fit=crop",
      title: "Professional Facial Cleaning",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1700760934268-8aa0ef52ce0a?q=80&w=1170&auto=format&fit=crop",
      title: "Modern Women's Haircut",
    },
    {
      id: 4,
      image: "https://plus.unsplash.com/premium_photo-1661493935776-a76a3e33dddf?q=80&w=1170&auto=format&fit=crop",
      title: "Classic Men's Barber",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1568339434343-2a640a1a9946?q=80&w=1170&auto=format&fit=crop",
      title: "Beard and Mustache Details",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1593702288056-7927b442d0fa?q=80&w=1170&auto=format&fit=crop",
      title: "Professional Men's Fade",
    },
  ];

  const openModal = (work) => {
    setSelectedImage(work);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Our Work</h1>
      <div className="gallery-grid">
        {works.map((work) => (
          <div key={work.id} className="gallery-card" onClick={() => openModal(work)}>
            <img src={work.image} alt={work.title} className="gallery-image" />
            <h3 className="gallery-card-title">{work.title}</h3>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.image} alt="Full View" className="modal-image" />
            <h2 className="modal-title">{selectedImage.title}</h2>
            <button className="modal-close" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
