import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../User.js'

export function LoginPage({ setCurrentUser }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [pin, setPin] = useState('') 
  const [isPinStep, setIsPinStep] = useState(false) 
  const [error, setError] = useState('')
  const navigate = useNavigate()

  
  function handleLogin(e) {
    e.preventDefault()
    setError('')
    const user = User.findByUsername(form.username)
    if (!user) return setError('Пользователь не найден')
    if (!user.checkPassword(form.password)) return setError('Неверный пароль')
    
    
    setIsPinStep(true)
  }

  
  function handlePinSubmit(e) {
    e.preventDefault()
    const user = User.findByUsername(form.username)
    
    
    const allUsers = User.getAll()
    const foundData = allUsers.find(u => u.username === form.username)

    if (pin === (foundData.pin || "1234")) { 
      User.saveSession(user.username)
      setCurrentUser(user)
      navigate('/dashboard')
    } else {
      setError('Неверный ПИН-код')
      setPin('') 
    }
  }

  useEffect(() => {
    if (localStorage.getItem('session') != null) {
      navigate('/dashboard')
    }
  }, [navigate])

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow border-0 p-4" style={{ width: 380, borderRadius: 20 }}>
        
      
        <div className="text-center mb-4">
          <div className="bg-primary bg-opacity-10 d-inline-block p-3 rounded-circle mb-3">
            <i className={`bi ${isPinStep ? 'bi-shield-lock' : 'bi-person-circle'} text-primary`} style={{ fontSize: 32 }}></i>
          </div>
          <h4 className="fw-bold mb-0">{isPinStep ? 'Защитный код' : 'Вход'}</h4>
          <p className="text-muted small">
            {isPinStep ? 'Введите 4 цифры для доступа' : 'Введите логин и пароль'}
          </p>
        </div>

        {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}

      
        {!isPinStep ? (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label small fw-bold">ЛОГИН</label>
              <input
                className="form-control bg-light border-0 py-2"
                placeholder="username"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold">ПАРОЛЬ</label>
              <input
                type="password"
                className="form-control bg-light border-0 py-2"
                placeholder="••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-primary w-100 py-2 fw-bold shadow-sm">
              Далее
            </button>
          </form>
        ) : (
          <form onSubmit={handlePinSubmit}>
            <div className="mb-4 text-center">
              <input
                type="password"
                className="form-control form-control-lg border-0 bg-light text-center fw-bold"
                style={{ letterSpacing: '1.2rem', fontSize: '2rem' }}
                maxLength="4"
                placeholder="••••"
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, ''))} 
                autoFocus
                required
              />
            </div>
            <button className="btn btn-success w-100 py-2 fw-bold mb-3 shadow-sm">
              Подтвердить
            </button>
            <button 
              type="button" 
              className="btn btn-link btn-sm w-100 text-decoration-none text-muted"
              onClick={() => setIsPinStep(false)}
            >
              Изменить аккаунт
            </button>
          </form>
        )}

        {!isPinStep && (
          <>
            <hr className="my-4" />
            <p className="text-center text-muted small mb-0">
              Нет аккаунта? <Link to="/register" className="text-primary fw-bold text-decoration-none">Зарегистрироваться</Link>
            </p>
          </>
        )}

      </div>
    </div>
  )
}