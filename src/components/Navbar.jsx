import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../User.js'

export function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate()

  function handleLogout() {
    User.clearSession()
    setCurrentUser(null)
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-shield-lock-fill me-2"></i>Auth App
        </Link>

        <div className="d-flex align-items-center gap-2">
          {currentUser ? (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/dashboard">
                <i className="bi bi-speedometer2 me-1"></i>Кабинет
              </Link>
              <Link className="btn btn-outline-light btn-sm" to="/profile">
                <i className="bi bi-person me-1"></i>{currentUser.username}
              </Link>
              <button className="btn btn-light btn-sm" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>Выйти
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/login">Войти</Link>
              <Link className="btn btn-light btn-sm" to="/register">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}