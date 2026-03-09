import { useNavigate } from 'react-router-dom'
import { User } from '../../User.js'

export function ProfilePage({ currentUser, setCurrentUser }) {
  const navigate = useNavigate()

  function handleDeleteAccount() {
    if (!confirm('Удалить аккаунт?')) return
    const users = User.getAll().filter(u => u.username !== currentUser.username)
    localStorage.setItem('users', JSON.stringify(users))
    User.clearSession()
    setCurrentUser(null)
    navigate('/login')
  }

  return (
    <div className="container py-5">
      <h4 className="fw-bold mb-4">
        <i className="bi bi-person-circle me-2 text-primary"></i>Профиль
      </h4>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
            <div className="card-body p-5 text-center">
              <div
                className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold mx-auto mb-3"
                style={{ width: 80, height: 80, fontSize: 32 }}
              >
                {currentUser.username[0].toUpperCase()}
              </div>
              <h5 className="fw-bold">{currentUser.username}</h5>
              <p className="text-muted small mb-4">Зарегистрирован: {currentUser.createdAt}</p>

              <div className="list-group text-start mb-4">
                <div className="list-group-item d-flex justify-content-between">
                  <span className="text-muted">Логин</span>
                  <strong>{currentUser.username}</strong>
                </div>
                <div className="list-group-item d-flex justify-content-between">
                  <span className="text-muted">Роль</span>
                  <span className="badge bg-secondary">user</span>
                </div>
                <div className="list-group-item d-flex justify-content-between">
                  <span className="text-muted">Дата регистрации</span>
                  <span className="small">{currentUser.createdAt}</span>
                </div>
              </div>

              <button className="btn btn-outline-danger btn-sm w-100" onClick={handleDeleteAccount}>
                <i className="bi bi-trash me-1"></i>Удалить аккаунт
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}