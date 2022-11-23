import './App.css';
import { Route } from 'react-router-dom'
import Home from './components/Home/Home';
import Create from './components/Create_Recipe/CreateRecipe';
import Nav from './components/Nav/Nav';
import Details from './components/Details/Details.jsx'

function App() {
  return (
    <div className="App">
      < Route exact path={'/'}>
          <Nav />
      </Route>

       <Route exact path={'/Home'} component={Home}/>
      
       <Route exact path={'/Create'} render={() => {return <Create />}}/>
       
       <Route exact path={'/detail/:id'} component={Details}/>

    </div>
  );
}

export default App;
