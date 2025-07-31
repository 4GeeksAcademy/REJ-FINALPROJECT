import React from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";
import { TiSortNumericallyOutline } from "react-icons/ti";

const Services = () => {
  const navigate = useNavigate();

  const cortes = [
    {
      id: 1,
      imagen: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      titulo: "Nail Services",
    },
    {
      id: 2,
      imagen:
        "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      titulo:  "Facial Massage Services",
    },
    {
      id: 3,
      imagen:
        "https://images.unsplash.com/photo-1700760934268-8aa0ef52ce0a?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      titulo: "Women’s Haircut Services",
    },
    {
      id: 4,
      imagen:
        "https://plus.unsplash.com/premium_photo-1661493935776-a76a3e33dddf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      titulo: "Men's barber Services",
    },
    {
      id: 5,
      imagen:
        "https://images.unsplash.com/photo-1568339434343-2a640a1a9946?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      titulo: "Men’s Details Services",
    },
    {
      id: 6,
      imagen:
        "https://images.unsplash.com/photo-1593702288056-7927b442d0fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      titulo: "Men’s Haircut Services",
    },
  ];

  return (
    
      <div className="row justify-center" style={estilos.contenedor}>
        <h1 className="titulo-principal justify-center" style={{ color: "#5a4a42" }}>
          <strong>Services</strong>
        </h1>
        <div style={estilos.galeria}>
          {cortes.map((corte) => (
            <div key={corte.id} style={estilos.card} className="card-corte">
              <img src={corte.imagen} alt="Corte" style={estilos.imagen} />
              <div style={estilos.descripcion}>
                <h4 className="text-center" style={{ color: "#5a4a42" }}>
                  <strong>{corte.titulo}</strong>
                </h4>
              </div>
              <button style={estilos.boton} onClick={() => navigate("/Home")}>
                Contact Us
              </button>
            </div>
          ))}
        </div>
      </div>
    
  );
};

const estilos = {
  contenedor: {
   display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "4rem",
  minHeight: "80vh",
  background: "linear-gradient(135deg, rgba(246,195,179,0.9) 0%, rgba(167,112,108,0.9) 100%)",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed", 
  },
 galeria: {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "2rem",
  justifyItems: "center",
  width: "100%",
  maxWidth: "1000px", // esto centra y limita la galería
  margin: "0 auto",
},

  card: {
  width: "100%", 
  maxWidth: "280px", 
  padding: "1rem",
  backgroundColor: "rgba(161, 98, 93, 0.21)",
  borderRadius: "12px",
  border: "2px solid #5a4a42",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
},

  imagen: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  descripcion: {
    fontFamily: "Playfair Display, serif",
    color: "white",
    textAlign: "center",
    backgroundColor: "rgba(167, 112, 108, 0.18)",
    margin: "2rem 0",
    fontWeight: "100",
    flexGrow: 1,
  },
  boton: {
    backgroundColor: "#5a4a42",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Services;
