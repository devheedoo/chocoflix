import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import TVShows from './Routes/TVShows';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={'/'}>
          <Home />
        </Route>
        <Route path={'/search'}>
          <Search />
        </Route>
        <Route path={'/tv_shows'}>
          <TVShows />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
