import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <img
        src="https://res.cloudinary.com/debrk14uy/image/upload/v1713351895/music_1x_wtcjng.png"
        alt="website logo"
        className="website-logo-img"
      />
      <div className="logout-container">
        <button
          type="button"
          className="logout-mobile-btn"
          onClick={onClickLogout}
        >
          <img
            src="https://res.cloudinary.com/debrk14uy/image/upload/v1714566996/logout_ftbi0u.png"
            alt="logout icon"
            className="logout-icon"
          />
        </button>
        <br />

        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
