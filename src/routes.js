import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header' // Importando o cabeçalho
import Home from './pages/Home' // Importando o componente do Home
import Filme from './pages/Filme' // Importando o componente do Filme
import Favoritos from './pages/Favoritos' // Importando o componente do Favorito
import Erro from './pages/Erro' // Importando o componente do Erro

const Routes = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/filme/:id" component={Filme} />
                <Route exact path="/Favoritos" component={Favoritos} />
                <Route path="*" component={Erro} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes