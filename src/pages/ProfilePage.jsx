import { useNavigate, Link } from 'react-router-dom'
import { User } from '../../User.js'

export function ProfilePage({ currentUser, setCurrentUser }) {
  const navigate = useNavigate()

  
  function handleDeleteAccount() {
    if (!confirm('Вы уверены, что хотите удалить кошелек? Все данные будут стерты.')) return
    User.deleteUser(currentUser.username)
    setCurrentUser(null)
    navigate('/login')
  }

  if (!currentUser) return null

  return (
    <div className="container py-4">
     
      <div className="text-center mb-4">
        <div
          className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold shadow-sm mb-3"
          style={{ width: 90, height: 90, fontSize: 36, border: '4px solid white' }}
        >
          {currentUser.username[0].toUpperCase()}
        </div>
        <h4 className="fw-bold mb-1">{currentUser.username}</h4>
        <p className="text-muted small">ID: {Math.floor(Math.random() * 1000000)}</p>
      </div>

      <div className="row justify-content-center g-4">
       
        <div className="col-md-5">
          <div className="card border-0 shadow-sm p-4 bg-primary text-white" style={{ borderRadius: 24 }}>
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <p className="small opacity-75 mb-1 text-uppercase fw-bold">Мой Баланс</p>
                <h2 className="fw-bold mb-0">{currentUser.balance ?? 1000} ₽</h2>
              </div>
              <i className="bi bi-wallet2 fs-3 opacity-50"></i>
            </div>
            
            <div className="d-grid">
              <Link to="/Money" className="btn btn-light fw-bold rounded-pill shadow-sm">
                <i className="bi bi-plus-lg me-2"></i>Пополнить счет
              </Link>
            </div>
          </div>

          <div className="card border-0 shadow-sm mt-4 p-3" style={{ borderRadius: 20 }}>
            <h6 className="fw-bold mb-3 px-2 text-muted small text-uppercase">Настройки безопасности</h6>
            <div className="list-group list-group-flush">
              <div className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 border-0">
                <div className="d-flex align-items-center">
                  <i className="bi bi-shield-lock text-primary me-3 fs-5"></i>
                  <span>ПИН-код доступа</span>
                </div>
                <span className="badge bg-light text-dark rounded-pill px-3">Активен</span>
              </div>
              <div className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 border-0">
                <div className="d-flex align-items-center">
                  <i className="bi bi-phone text-success me-3 fs-5"></i>
                  <span>Двухфакторная вход</span>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </div>

     
        <div className="col-md-5">
          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: 24 }}>
            <h6 className="fw-bold mb-4 text-muted small text-uppercase">Информация об аккаунте</h6>
            
            <div className="mb-3">
              <label className="text-muted small d-block mb-1">Имя пользователя</label>
              <div className="fw-bold border-bottom pb-2">{currentUser.username}</div>
            </div>
            
            <div className="mb-3">
              <label className="text-muted small d-block mb-1">Email / Логин</label>
              <div className="fw-bold border-bottom pb-2">{currentUser.username}</div>
            </div>

            <div className="mb-4">
              <label className="text-muted small d-block mb-1">Дата создания кошелька</label>
              <div className="fw-bold border-bottom pb-2">{currentUser.createdAt}</div>
            </div>

            <button 
              className="btn btn-link text-danger text-decoration-none p-0 small fw-bold" 
              onClick={handleDeleteAccount}
            >
              <i className="bi bi-trash3 me-2"></i>Закрыть кошелек навсегда
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}