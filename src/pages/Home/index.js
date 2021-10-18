import { useEffect, useState } from 'react'
import api from '../../services/axios' // Importando o arquivo com a requisição axios que foi definida
import { Link } from 'react-router-dom'
import './home.css'

export default function Home () {

  const [filmes, setFilmes] = useState([])

  // Quando a aplicação for carregada, acontece o que está dentro desse Hook abaixo
  useEffect(() => {
    // Essa função vai na API e pega os filmes (usamos o async pois essa busca nos filmes pode demorar)
    async function loadFilmes () {
      const response = await api.get('r-api/?api=filmes')
      setFilmes(response.data)
    }

    loadFilmes()

  }, [])


  return (
    <div className="container">
      <div className="lista-filmes">
          {filmes.map((filme) => {
            return (
              <article key={filme.id}>
                <strong>{filme.nome}</strong>
                <img src={filme.foto} alt={filme.nome} />
                <Link to={`/filme/${filme.id}`}>Acessar</Link>
              </article>
            )
          })}
      </div>
    </div>
  );
}