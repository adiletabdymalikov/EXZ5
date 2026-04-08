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
      
      <div className="bg-white border-bottom px-3 py-2 sticky-top d-lg-none">
        <div className="d-flex justify-content-between align-items-center">
          {location.pathname !== '/' ? (
            <button onClick={() => navigate(-1)} className="btn btn-link text-dark p-0">
              <i className="bi bi-chevron-left fs-4"></i>
            </button>
          ) : (
            <div style={{ width: 24 }}></div> 
          )}
          
          <span className="fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
            {location.pathname === '/' ? 'Мой Кошелек' : 
             location.pathname === '/profile' ? 'Профиль' : 
             location.pathname === '/Money' ? 'Финансы' : 'Раздел'}
          </span>

          <button onClick={handleLogout} className="btn btn-link text-danger p-0">
            <i className="bi bi-box-arrow-right fs-4"></i>
          </button>
        </div>
      </div>

     
      <div className="fixed-bottom bg-white border-top d-flex justify-content-around align-items-center py-2 shadow-lg d-lg-none" 
           style={{ height: '65px', zIndex: 1050 }}>
        
        <Link to="/" className={`text-decoration-none text-center ${isActive('/')}`}>
          <i className={`bi ${location.pathname === '/' ? 'bi-house-door-fill' : 'bi-house-door'} fs-4`}></i>
          <div style={{ fontSize: '10px' }}>Главная</div>
        </Link>

        <Link to="/Money" className={`text-decoration-none text-center ${isActive('/Money')}`}>
          <i className={`bi ${location.pathname === '/Money' ? 'bi-wallet2' : 'bi-wallet2'} fs-4`}></i>
          <div style={{ fontSize: '10px' }}>Платежи</div>
        </Link>

        <Link to="/dashboard" className={`text-decoration-none text-center ${isActive('/dashboard')}`}>
          <i className={`bi ${location.pathname === '/dashboard' ? 'bi-grid-fill' : 'bi-grid'} fs-4`}></i>
          <div style={{ fontSize: '10px' }}>Сервисы</div>
        </Link>

        <Link to="/profile" className={`text-decoration-none text-center ${isActive('/profile')}`}>
          <i className={`bi ${location.pathname === '/profile' ? 'bi-person-fill' : 'bi-person'} fs-4`}></i>
          <div style={{ fontSize: '10px' }}>Профиль</div>
        </Link>
      </div>

     
      <div style={{ height: '65px' }} className="d-lg-none"></div>
    </>
  )
}