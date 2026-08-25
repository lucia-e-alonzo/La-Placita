import datosFooter from "../../../data/footer.json";

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer
      className="footer"
      aria-label="Pie de página de La Placita"
    >
      <div className="footer-info">
        <h2 className="footer-nombre">{datosFooter.nombre}</h2>

        <p className="footer-slogan">
          {datosFooter.slogan}
        </p>

        <section
          className="footer-contacto"
          aria-labelledby="footer-contacto-titulo"
        >
          <h3 id="footer-contacto-titulo">Contacto</h3>

          <address className="footer-direccion">
            <p>{datosFooter.direccion}</p>

            <p>
              <strong>Teléfono:</strong> {datosFooter.telefono}
            </p>

            <p>
              <strong>Correo:</strong> {datosFooter.email}
            </p>
          </address>
        </section>

        <section
          className="footer-horario"
          aria-labelledby="footer-horario-titulo"
        >
          <h3 id="footer-horario-titulo">Horario</h3>
          <p>{datosFooter.horario}</p>
        </section>

        <section
          className="footer-redes"
          aria-labelledby="footer-redes-titulo"
        >
          <h3 id="footer-redes-titulo">Redes sociales</h3>

          <ul className="footer-redes-lista">
            {datosFooter.redesSociales.map((red) => (
              <li key={red.id}>
                <span className="footer-red-social">
                  {red.nombre}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="footer-copyright">
        <p>
          © {anioActual} {datosFooter.nombre}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;