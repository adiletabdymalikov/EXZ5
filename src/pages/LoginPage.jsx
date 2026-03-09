import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../User.js'

export function LoginPage({ setCurrentUser }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const user = User.findByUsername(form.username)
    if (!user) return setError('Пользователь не найден')
    if (!user.checkPassword(form.password)) return setError('Неверный пароль')
    User.saveSession(user.username)
    setCurrentUser(user)
    navigate('/dashboard')
  }

  function UserDetails() {
    if (localStorage.getItem('session') != null) {
      navigate('/dashboard')
    }
  }

  useEffect(() => {
    UserDetails()
  }, [])

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4" style={{ width: 380, borderRadius: 16 }}>
        <div className="text-center mb-4">
          <i className="bi bi-person-circle text-primary" style={{ fontSize: 48 }}></i>
          <h4 className="fw-bold mt-2 mb-0">Вход</h4>
          <p className="text-muted small">Введите логин и пароль</p>
        </div>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Логин</label>
            <input
              className="form-control"
              placeholder="username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Пароль</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button className="btn btn-primary w-100">
            <i className="bi bi-box-arrow-in-right me-2"></i>Войти
          </button>
        </form>

        <hr />
        <p className="text-center text-muted small mb-0">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>

  
        <div className="mt-3 p-3 bg-light rounded" style={{ fontSize: 13 }}>
          <div className="fw-semibold mb-1">Тестовые аккаунты:</div>
          <div className="text-muted">admin@example.com / 123456</div>
          <div className="text-muted">user@example.com / password</div>
          <div className="text-muted">student@example.com / student123</div>
        </div>

      </div>
    </div>
  )
}