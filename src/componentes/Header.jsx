function Header() {
  function irAInicio() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      <div className="header-banner">
        <img
          src="/banner.jpg"
          alt="Banner de Comedor La Placita"
        />
      </div>

      <div className="header-nombre">
        <h1>Comedor La Placita</h1>
      </div>

      <nav>
        <button onClick={irAInicio}>Inicio</button>
        <button onClick={irAlMenu}>Menú</button>
        <button onClick={irAlCorreo}>Correo</button>
      </nav>
    </header>
  );
}

export default Header;