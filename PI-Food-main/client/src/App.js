import './App.css';
import { Route } from 'react-router-dom'
import Home from './componentes/Home/Home';
import Create from './componentes/Crear_Receta/CrearReceta';
import Nav from './componentes/Nav/Nav';
import Detalle from './componentes/Detalle/Detalle';

function App() {
  return (
    <div className="App">
      < Route exact path={'/'}>
          <Nav />
      </Route>

       <Route exact path={'/Home'} component={Home}/>
      
       <Route exact path={'/Create'} render={() => {return <Create />}}/>
       
       <Route exact path={'/detalle/:id'} component={Detalle}/>

    </div>
  );
}

export default App;
