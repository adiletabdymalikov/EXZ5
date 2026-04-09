import { Link, useNavigate, useLocation } from 'react-router-dom'
import { User } from '../../User.js'

export function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate()
  const location = useLocation() 

  function handleLogout() {
    if (window.confirm('Выйти из кошелька?')) {
      User.clearSession()
      setCurrentUser(null)
      navigate('/login')
    }
  }

  if (!currentUser) return null;

  const isActive = (path) => location.pathname === path ? 'text-primary' : 'text-muted';

  return (
    <>
    
      <div className="bg-white border-bottom px-3 py-2 sticky-top shadow-sm">
        <div className="container d-flex justify-content-between align-items-center" style={{ maxWidth: '800px' }}>
        
          <div style={{ width: 40 }}>
            {location.pathname !== '/' && (
              <button onClick={() => navigate(-1)} className="btn btn-link text-dark p-0 border-0 shadow-none">
                <i className="bi bi-chevron-left fs-4"></i>
              </button>
            )}
          </div>
          
          <span className="fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
            {location.pathname === '/' ? 'Мой Кошелек' : 
             location.pathname === '/profile' ? 'Профиль' : 
             location.pathname === '/Money' ? 'Финансы' : 'Раздел'}
          </span>

          <div style={{ width: 40 }} className="text-end">
            <button onClick={handleLogout} className="btn btn-link text-danger p-0 border-0 shadow-none">
              <i className="bi bi-box-arrow-right fs-4"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed-bottom bg-white border-top shadow-lg" 
           style={{ height: '70px', zIndex: 1050 }}>
        <div className="container h-100 d-flex justify-content-around align-items-center" style={{ maxWidth: '600px' }}>
          
          <Link to="/" className={`text-decoration-none text-center px-3 ${isActive('/')}`}>
            <i className={`bi ${location.pathname === '/' ? 'bi-house-door-fill' : 'bi-house-door'} fs-3`}></i>
            <div style={{ fontSize: '11px', fontWeight: '500' }}>Главная</div>
          </Link>

          <Link to="/Money" className={`text-decoration-none text-center px-3 ${isActive('/Money')}`}>
            <i className={`bi ${location.pathname === '/Money' ? 'bi-wallet2' : 'bi-wallet2'} fs-3`}></i>
            <div style={{ fontSize: '11px', fontWeight: '500' }}>Платежи</div>
          </Link>

          <Link to="/dashboard" className={`text-decoration-none text-center px-3 ${isActive('/dashboard')}`}>
            <i className={`bi ${location.pathname === '/dashboard' ? 'bi-grid-fill' : 'bi-grid'} fs-3`}></i>
            <div style={{ fontSize: '11px', fontWeight: '500' }}>Сервисы</div>
          </Link>

          <Link to="/profile" className={`text-decoration-none text-center px-3 ${isActive('/profile')}`}>
            <i className={`bi ${location.pathname === '/profile' ? 'bi-person-fill' : 'bi-person'} fs-3`}></i>
            <div style={{ fontSize: '11px', fontWeight: '500' }}>Профиль</div>
          </Link>
        </div>
      </div>

      
      <div style={{ height: '80px' }}></div>
    </>
  )
}