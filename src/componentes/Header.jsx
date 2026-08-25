import './Header.css';

function Header() {
  function irAInicio() {
    window.location.reload();
    }

  function irAlMenu() {
    document.getElementById("menu")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  function irAlCorreo() {
    document.getElementById("correo")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <header>
      <nav>
        <button onClick={irAInicio}>Inicio</button>
        <button onClick={irAlMenu}>Menú</button>
        <button onClick={irAlCorreo}>Contacto</button>
      </nav>
      
      <div className="header-banner">
        <img
          src="/img/banner.jpg"
          alt="Banner de Comedor La Placita"
        />
      </div>

      <div className="header-nombre">
        <h1>COMEDOR  "LA  PLACITA"</h1>
      </div>
    </header>
  );
}

export default Header;