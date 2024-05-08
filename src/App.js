import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'

import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import OnClickEditorsPlaylist from './components/OnClickEditorsPlaylist'
import OnClickNewreleasesPlaylist from './components/OnClickNewreleasesPlaylist'
import OnClickGenreAndMoodsPlayList from './components/OnClickGenreAndMoodsPlayList'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/editors/:id"
        component={OnClickEditorsPlaylist}
      />
      <ProtectedRoute
        exact
        path="/newReleases/:id"
        component={OnClickNewreleasesPlaylist}
      />

      <ProtectedRoute
        exact
        path="/genre/:id"
        component={OnClickGenreAndMoodsPlayList}
      />

      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
