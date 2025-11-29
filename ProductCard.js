import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.img} />

      <h3>{product.name}</h3>
      <p>${product.price.toLocaleString()}</p>


      <button style={styles.button}>Comprar</button>
    </div>
  );
};

const styles = {
  card: {
    width: "220px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
  },
  img: {
    width: "100%",
    borderRadius: "10px",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProductCard;


