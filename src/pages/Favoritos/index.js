import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './favoritos.css'
import { toast } from 'react-toastify'

export default function Favoritos () {
    const [filmes, setFilmes] = useState([])

    // Quando a página carregar, pegaremos todos os filmes que salvamos em localStorage e listaremos
    useEffect(() => {
        const minhaLista = localStorage.getItem('filmes')
        setFilmes(JSON.parse(minhaLista) || []) // Se não houver algo no localStorage, então passamos um array vazio
    }, [])

    // Função de deletar um item da nossa lista (deletará no localStorage)
    function handleDelete(idFilmeDeletado) {
        // Iremos retornar a lista de todos os filmes que estão no localStorage, menos aquele que foi clicado pra deletar
        // Vamos usar o filter, do JS Vanilla, para percorrer nossa lista (e os objetos dentro dela) de filmes retornada (porém sem o que iremos deletar)
        let filtroFilmes = filmes.filter((item) => {
            // Retornaremos todos os objetos que tem o id diferente do que clicamos
            return (item.id !== idFilmeDeletado)
        })
        
        // Agora setaremos os filmes no nosso estado e no localStorage, menos aquele filme que excluímos
        setFilmes(filtroFilmes);
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes))

        toast.success('Filme Excluído com Sucesso !') // Usando a biblioteca de alertas
    }

    return (
        <div id="meus-filmes">
          <h1>Meus Filmes</h1>

            { /* Se a quantidade de itens no nosso array for igual a zero, quer dizer que não temos filmes na lista */ }
            {filmes.length === 0 && <span>Você não possui filme salvo :( </span>}

            <ul>
              {filmes.map((item) => {
                return (
                  <li key={item.id}>
                    <span>{item.nome}</span>
                      <div>
                        <Link to={`/filme/${item.id}`}>Detalhes</Link>
                        { /* é importante chamar o método abaixo, a partir de uma função anônima. Do contrário apagará tudo */ }
                        { /* ... Pois com função anônima a função ali não é executada. Apenas quando nós clicarmos */ }
                        { /* ... Fazemos isso pq estamos passando parâmetro */ }
                        <button onClick={ () =>  handleDelete(item.id) } className="btn-remover">Excluir</button>
                      </div>
                  </li>
                )
              })}
            </ul>
        </div>
    )
}