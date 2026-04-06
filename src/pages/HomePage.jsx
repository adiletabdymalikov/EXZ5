import { Link } from 'react-router-dom'

export function HomePage({ currentUser }) {
  return (
    <div className="min-vh-100 bg-white">
     
      <div className="bg-primary pt-5 pb-5 px-4" style={{ borderBottomLeftRadius: '40px', borderBottomRightRadius: '40px' }}>
        <div className="container max-width-500 text-white">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <p className="opacity-75 mb-0 small">Привет,</p>
              <h4 className="fw-bold">{currentUser ? currentUser.username : 'Гость'}</h4>
            </div>
            <div className="bg-white bg-opacity-25 rounded-circle p-2">
              <i className="bi bi-person-fill fs-5"></i>
            </div>
          </div>

        
          <div className="card border-0 shadow-lg text-dark p-4" style={{ borderRadius: '24px', background: 'white' }}>
            <p className="text-muted small mb-1 fw-semibold text-uppercase">Ваш баланс</p>
            <h1 className="fw-bold mb-3">
              {currentUser ? `${currentUser.balance ?? 1000} ₽` : '0 ₽'}
            </h1>
            <div className="d-flex gap-2">
              <Link to="/Money" className="btn btn-primary rounded-pill px-4 fw-bold flex-grow-1 shadow-sm">
                <i className="bi bi-plus-lg me-2"></i>Пополнить
              </Link>
              <Link to="/profile" className="btn btn-light rounded-pill p-2 shadow-sm" style={{ width: '45px' }}>
                <i className="bi bi-gear"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {currentUser ? (
          <>
          
            <div className="row g-3 text-center mb-5">
               <div className="col-3">
                <Link to="/Money" className="text-decoration-none">
                  <div className="bg-success bg-opacity-10 text-success p-3 rounded-4 mb-2 mx-auto" style={{ width: '60px' }}>
                    <i className="bi bi-arrow-down-left fs-4"></i>
                  </div>
                  <span className="small text-dark fw-medium">Ввод</span>
                </Link>
              </div>
              <div className="col-3">
                <Link to="/dashboard" className="text-decoration-none">
                  <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-4 mb-2 mx-auto" style={{ width: '60px' }}>
                    <i className="bi bi-people fs-4"></i>
                  </div>
                  <span className="small text-dark fw-medium">Друзья</span>
                </Link>
              </div>
              <div className="col-3">
                <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-4 mb-2 mx-auto" style={{ width: '60px' }}>
                  <i className="bi bi-grid fs-4"></i>
                </div>
                <span className="small text-dark fw-medium">Сервисы</span>
              </div>
              <div className="col-3">
                <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-4 mb-2 mx-auto" style={{ width: '60px' }}>
                  <i className="bi bi-clock-history fs-4"></i>
                </div>
                <span className="small text-dark fw-medium">История</span>
              </div>
            </div>

          
            <h6 className="fw-bold mb-3 px-2">Информация</h6>
            <div className="card border-0 bg-light p-3 mb-4" style={{ borderRadius: '20px' }}>
              <div className="d-flex align-items-center mb-3">
                <div className="bg-white p-2 rounded-3 me-3 shadow-sm text-primary">
                   <i className="bi bi-shield-check"></i>
                </div>
                <div>
                  <div className="fw-bold small">Безопасность</div>
                  <div className="text-muted" style={{ fontSize: '12px' }}>Ваш аккаунт защищен 256-bit шифрованием</div>
                </div>
              </div>
            </div>
          </>
        ) : (
         
          <div className="text-center py-5">
            <h2 className="fw-bold">Добро пожаловать</h2>
            <p className="text-muted px-4">Управляйте своими финансами просто и безопасно в одном приложении.</p>
            <div className="d-grid gap-3 mt-4 px-4">
               <Link className="btn btn-primary btn-lg rounded-pill fw-bold py-3" to="/login">Войти в кошелек</Link>
               <Link className="btn btn-outline-primary btn-lg rounded-pill fw-bold py-3" to="/register">Регистрация</Link>
            </div>
            
            <div className="mt-5 p-3 mx-4 bg-light rounded-4" style={{ fontSize: 13 }}>
              <div className="fw-bold mb-2">Тестовый доступ:</div>
              <div className="d-flex justify-content-between text-muted border-bottom py-1">
                <span>admin@example.com</span>
                <span>123456 (pin: 1234)</span>
              </div>
              <div className="d-flex justify-content-between text-muted py-1">
                <span>user@example.com</span>
                <span>password (pin: 1234)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}