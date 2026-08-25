// src/App.jsx
import Menuprincipal from "./componentes/Menu/Menuprincipal";
import Footer from './componentes/Footer/Footer';
import Correo from "./componentes/Correo/Correo";

function App() {
  return (
    <div className="app-container">
   
      <main>
        <Menuprincipal />
        <Correo />
        <Footer />
      </main>
    </div>
  );
}

export default App;