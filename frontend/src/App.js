import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
// import Tambah from './pages/Tambah';
import Tambah from './app/Tambah';



const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact children={() => <Home />} />
          <Route path="/detail/:id" children={() => <Detail />} />
          <Route path="/edit/:id" > <Edit /></Route>
          {/* <Route path="/tambah" children={() => <Tambah />} /> */}
        
         <Route path="/tambah" >  
         <Tambah />
         </Route>
         
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;