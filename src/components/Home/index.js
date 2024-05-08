import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import EditorsPicksRoute from '../EditorsPicksRoute'
import GenresAndMoodsRoute from '../GenresAndMoodsRoute'
import NewReleasesRoute from '../NewReleasesRoute'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <div className="home-container">
        <Header />

        <div>
          <EditorsPicksRoute />
          <GenresAndMoodsRoute />
          <NewReleasesRoute />
        </div>
      </div>
    </>
  )
}

export default Home
