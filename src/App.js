import { Button } from 'antd';
import 'antd/dist/antd.css';
import './static/css/comm.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, AdminIndex } from './pages';
import Footer from './components/Footer';
function App() {
  return (
    <BrowserRouter className="App">
      <Switch>
        <Route path='/AdminIndex' component={AdminIndex} />
        <Route path='/' component={Login} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
