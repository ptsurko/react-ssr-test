import Home from './Home';
import Grid from './Grid';
import View from './View';
import { fetchPopularRepos } from './api';

const routes = [{
  path: '/',
  exact: true,
  component: Home,
}, {
  path: '/grid',
  // path: '/popular/:id',
  component: Grid,
  fetchInitialData: (path='') => fetchPopularRepos(path.split('/').pop()),
}];

export default routes;