import React from "react";

const AboutUs = () => {
  return (
    <section style={styles.container} aria-label="Quienes somos">
      <div style={styles.inner}>
        <h2 style={styles.title}>Quiénes somos</h2>
        <p style={styles.text}>
          Somos una marca local apasionada por el estilo urbano y la calidad. Seleccionamos
          cuidadosamente cada gorra para ofrecerte diseño, comodidad y durabilidad. Nos
          comprometemos con procesos transparentes, proveedores responsables y atención al
          cliente rápida y cercana.
        </p>
        <p style={styles.textSmall}>
          Puedes confiar en nosotros porque usamos pagos seguros, política clara de devoluciones
          y reseñas reales de clientes satisfechos. Nuestra prioridad es que recibas el producto
          que esperas, sin sorpresas.
        </p>
      </div>
    </section>
  );
};

const styles = {
  container: {
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 10,
    padding: "28px 20px",
    marginBottom: 30,
  },
  inner: {
    maxWidth: 1000,
    margin: "0 auto",
  },
  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: "#1a1a1a",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  text: {
    margin: 0,
    color: "#333333",
    lineHeight: 1.6,
    marginBottom: 8,
  },
  textSmall: {
    margin: 0,
    color: "#666666",
    fontSize: 14,
    lineHeight: 1.5,
  },
};

export default AboutUs;
