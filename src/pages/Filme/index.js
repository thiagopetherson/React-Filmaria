
import { useEffect, useState } from 'react'
import './filme-info.css'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../services/axios'
import { toast } from 'react-toastify'

export default function Filme () {
  const { id } = useParams() // Pegando o valor que veio como parâmetro na rota
  const history = useHistory()

  const [filme, setFilme] = useState([]) // Criando o estado filme
  const [loading, setLoading] = useState(true) // Pra quando entrar na página, já ter um loading acontecendo

  useEffect(() => {

    // Usamos async pois a requisição poderá demorar um pouco
    async function loadFilme () {
      const response = await api.get(`r-api/?api=filmes/${id}`) // Realizando a requisição 'get' para a API

      // Tentou acessar com um ID que não existe, então redirecionamos ele para a HOME
      if (response.data.length === 0) {
        history.replace('/')
        return
      }

      setFilme(response.data) // Setando o estado com o retorno da requisição
      setLoading(false) // Setando o estado 'loading' com false
    }

    loadFilme()
    
    // Fazemos essa parte aqui para quando o componente for desmontado
    return () => {
      console.log('COMPONENTE DESMONTADO')
    }

  }, [id, history]) // Passando o id (e o history) como dependência aqui, pois dizemos que esse Hook precisa (utilizará) desse parâmetro


  // Função de Salvar o filme
  function salvarFilme () {
    // Pegando os items que temos
    const minhaLista = localStorage.getItem('filmes')

    // Passando a lista de filmes que pegamos ou, se vier vazio, passaremos um array vazio
    let filmesSalvos = JSON.parse(minhaLista) || []

     // Verificando se a lista só tem um item, pois, se isso acontecer, dará problema abaixo, no método some (pois será um objeto e some não percorre objeto)
    let isList = Array.isArray(filmesSalvos)
    
    // Se cair no if, significa que veio mais de um item na lista e a variável filmesSalvos é um array (se não, a variável é um objeto)
    if (isList === true) {
       // Verificando se existe um filme salvo com o mesmo ID (não salvaremos novamente)
      //... O some é um método nativo do JavaScript que percorre o array e verifica se existe algum item com o parâmetro que passamos (se achar igual, retorna true, se não achar igual, retorna false)
      const existeFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id )
      
      if (existeFilme) {
        // Parando a execução do código aqui (caso já tenha o filme na lista)
        toast.error('Erro: Você já possui esse filme salvo !') // Usando a biblioteca de alertas        
        return     
      }
    } else {
      const existeFilme = filmesSalvos.id === filme.id ? true : false

      if (existeFilme) {
        // Parando a execução do código aqui (caso já tenha o filme na lista)
        toast.error('Erro: Você já possui esse filme salvo !') // Usando a biblioteca de alertas        
        return     
      }
    }
    
   
    // Se cair no if, significa que só veio um item na lista e a variável filmesSalvos é um objeto
    if (isList === false) {

      let addFilmes = []
      addFilmes.push(filmesSalvos)
      addFilmes.push(filme)
      localStorage.setItem('filmes', JSON.stringify(addFilmes)) // Para salvar no localStorage temos que usar o JSON.stringify
      toast.success('Sucesso: O filme foi salvo !') // Usando a biblioteca de alertas    
      return 
    }

    // Abaixo, continuamos no caso de filmesSalvos for um array e possuir mais de um filme
   
    // Salvando o filme na lista
    filmesSalvos.push(filme)
    // Salvando o filme no localStorage (adicionando um item no localStorage)
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos)) // Para salvar no localStorage temos que usar o JSON.stringify    
    toast.success('Sucesso: O filme foi salvo !') // Usando a biblioteca de alertas
  }


  // É exibido um loading até aque a página seja carregada por completo
  if (loading) {
    return (
      <div className="filme-info">
        <h1>CARREGANDO SEU FILME...</h1>
      </div>
    )
  }

  return (
    <div className="filme-info">
        <h1>{filme.nome}</h1>
        <img src={filme.foto} alt={filme.nome} />

        <h3>Sinopse</h3>
        {filme.sinopse}

        <div className="botoes">
          <button onClick={salvarFilme} className="btn-salvar">Salvar</button>
          <button className="btn-trailer">
            {/* Essa parte é feita para buscarmos no youtube com o nome do filme */}
            {/* OBS: Abaixo, até o '=' (igual) geralmente é padrão nas buscar do youtube */}
            <a target="blank" href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>
              Trailer
            </a>
          </button>
        </div>
    </div>
  );
}