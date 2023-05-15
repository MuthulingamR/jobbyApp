import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <div className="nav-bar-mobile-logo-container">
          <ul className="nav-menu-list-mobile">
            <li className="nav-menu-item-mobile">
              <Link to="/" className="nav-link">
                <AiFillHome className="nav-bar-image" />
              </Link>
            </li>

            <li className="nav-menu-item-mobile">
              <Link to="/jobs" className="nav-link">
                <BsFillBriefcaseFill className="nav-bar-image" />
              </Link>
            </li>
            <button
              type="button"
              onClick={onClickLogout}
              className="nav-mobile-btn"
            >
              <FiLogOut className="nav-bar-image" />
            </button>
          </ul>
        </div>

        <div className="nav-bar-large-container">
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
