// src/App.jsx
import "./App.css";
import Header from "./componentes/Header";
import Menuprincipal from "./componentes/Menu/Menuprincipal";
import Footer from './componentes/Footer/Footer';
import Correo from "./componentes/Correo/Correo";

function App() {
  return (
    <div className="app-container">
        <Header />

      <main>
        <section id="menu">
          <Menuprincipal />
        </section>

        <section id="correo">
          <Correo />
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default App;