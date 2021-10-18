import './styles.css'
import Routes from './routes'
import 'react-toastify/dist/ReactToastify.css' // Importando o CSS padrão do React Toastify
import { ToastContainer } from 'react-toastify' // Importando o React Toastify

// https://sujeitoprogramador.com/r-api/?api=filmes/

export default function App () {
  return (
    <div className="app">
      <Routes />
      <ToastContainer autoclose={3000} />
      { /* Acima, passamos a propriedade autocloase para dar um tempo de fechamento do alert */ }
    </div>
  );
}