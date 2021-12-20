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
        <Route path={'/search'}>
          <Search />
        </Route>
        <Route path={['/tv_show', '/tv_show/:tvShowId']}>
          <TVShows />
        </Route>
        <Route path={['/', '/movie/:movieId']}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
