// 1. Traemos tu componente del menú
// Solo preparamos el import para el frontend
import Menu from './componentes/Menu';

// 2. Aquí tu compañero de CSS conectará los estilos globales
import './App.css';

function App() {
  return (
    <main>
      {/* Aquí tus compañeros pondrán el Encabezado/Banner */}
      
      {/* AQUÍ VA TU PARTE: El Menú interactivo */}
      <Menu />

      {/* Aquí tus compañeros pondrán el Formulario de Don Chente y el Pie de página */}
    </main>
  );
}

export default App;