import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./Services.css";

Modal.setAppElement("#root");

const Services = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const cortes = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80",
      title: "Nail Services",
      description: "Includes manicure, pedicure and nail art.",
      duration: "45 minutes",
      price: "$30",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80",
      title: "Facial Massage Services",
      description: "Relaxing facial massage to rejuvenate your skin.",
      duration: "60 minutes",
      price: "$50",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1700760934268-8aa0ef52ce0a?q=80",
      title: "Women’s Haircut Services",
      description: "Modern and stylish women’s haircut.",
      duration: "30 minutes",
      price: "$25",
    },
    {
      id: 4,
      image:
        "https://plus.unsplash.com/premium_photo-1661493935776-a76a3e33dddf?q=80",
      title: "Men's Barber Services",
      description: "Classic barber services with detail finish.",
      duration: "40 minutes",
      price: "$28",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1568339434343-2a640a1a9946?q=80",
      title: "Men’s Details Services",
      description: "Beard trimming and precision grooming.",
      duration: "25 minutes",
      price: "$20",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1593702288056-7927b442d0fa?q=80",
      title: "Men’s Haircut Services",
      description: "Clean, fresh men’s haircut.",
      duration: "30 minutes",
      price: "$25",
    },
  ];

  return (
    <div className="conteiner-demo">
      <h1 className="titulo-principal" style={{ color: "#5a4a42" }}>
        <strong>Services</strong>
      </h1>
      <div className="galeria">
        {cortes.map((corte) => (
          <div
            key={corte.id}
            className="card-corte large"
            onClick={() => setSelected(corte)}
            style={{ cursor: "pointer" }}
          >
            <img src={corte.image} alt={corte.title} className="card-image" />
            <div className="descripcion-corte">
              <h4>{corte.title}</h4>
            </div>
            <button
              className="btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/ContactUs");
              }}
            >
              Contact Us
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selected}
        onRequestClose={() => setSelected(null)}
        contentLabel="Service Details"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selected && (
          <>
            <h2>{selected.title}</h2>
            <img
              src={selected.image}
              alt={selected.title}
              className="modal-image"
            />
            <p>
              <strong>Description:</strong> {selected.description}
            </p>
            <p>
              <strong>Duration:</strong> {selected.duration}
            </p>
            <p>
              <strong>Price:</strong> {selected.price}
            </p>

            <div className="modal-buttons">
              <button onClick={() => setSelected(null)} className="btn">
                Go Back
              </button>
              <button
                onClick={() => navigate("/ContactUs")}
                className="btn"
              >
                Contact Us
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Services;
