import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../User.js'

export function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

 function UserDetails(){
    if(localStorage.getItem('session') != null){
        navigate('/dashboard');
    }
  }
 useEffect(()=>{
    UserDetails();
 },[])
  
  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.username.length < 3) return setError('Логин — минимум 3 символа')
    if (form.password.length < 4) return setError('Пароль — минимум 4 символа')
    if (form.password !== form.confirm) return setError('Пароли не совпадают')
    try {
      const user = new User(form.username, form.password)
      user.save()
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(err.message)
    }
  }

  if (success) return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-5 text-center" style={{ width: 380, borderRadius: 16 }}>
        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: 56 }}></i>
        <h5 className="fw-bold mt-3">Аккаунт создан!</h5>
        <p className="text-muted">Перенаправляем на страницу входа...</p>
      </div>
    </div>
  )

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4" style={{ width: 380, borderRadius: 16 }}>
        <div className="text-center mb-4">
          <i className="bi bi-person-plus-fill text-success" style={{ fontSize: 48 }}></i>
          <h4 className="fw-bold mt-2 mb-0">Регистрация</h4>
          <p className="text-muted small">Создайте новый аккаунт</p>
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
          <div className="mb-3">
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
          <div className="mb-4">
            <label className="form-label fw-semibold">Повторите пароль</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••"
              value={form.confirm}
              onChange={e => setForm({ ...form, confirm: e.target.value })}
              required
            />
          </div>
          <button className="btn btn-success w-100">
            <i className="bi bi-person-check me-2"></i>Создать аккаунт
          </button>
        </form>

        <hr />
        <p className="text-center text-muted small mb-0">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
        <div className="mt-3 p-3 bg-light rounded" style={{ fontSize: 13 }}>
  <div className="fw-semibold mb-1">Тестовые аккаунты:</div>
  <div className="text-muted">admin@example.com / 123456</div>
  <div className="text-muted">user@example.com / password</div>
  <div className="text-muted">student@example.com / student123</div>
</div>
      </div>
      <div className="mt-3 p-3 bg-light rounded" style={{ fontSize: 13 }}>
  <div className="fw-semibold mb-1">Тестовые аккаунты:</div>
  <div className="text-muted">admin@example.com / 123456</div>
  <div className="text-muted">user@example.com / password</div>
  <div className="text-muted">student@example.com / student123</div>
</div>
    </div>
  )
}