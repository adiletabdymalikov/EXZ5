import { Link } from 'react-router-dom'

export function HomePage({ currentUser }) {

  const transactions = [
    { id: 1, title: 'Пополнение', desc: 'Перевод по номеру', amount: '+ 2 500 ₽', icon: 'bi-plus-circle-fill', color: 'success' },
    { id: 2, title: 'Магазин', desc: 'Продукты', amount: '- 1 230 ₽', icon: 'bi-cart-fill', color: 'danger' },
  ];

  return (
    <div className="min-vh-100 bg-light">

      <div className="bg-white border-bottom shadow-sm px-4 py-3 sticky-top">
        <div className="container d-flex justify-content-between align-items-center" style={{ maxWidth: '500px' }}>
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold me-3 shadow-sm" style={{ width: 42, height: 42 }}>
              {currentUser ? currentUser.username[0].toUpperCase() : 'G'}
            </div>
            <div>
              <p className="text-muted mb-0 small">Привет,</p>
              <h6 className="fw-bold mb-0">{currentUser ? currentUser.username : 'Гость'}</h6>
            </div>
          </div>
          {currentUser && (
            <Link to="/profile" className="text-dark"><i className="bi bi-gear-fill fs-5"></i></Link>
          )}
        </div>
      </div>

      <div className="container py-4" style={{ maxWidth: '500px' }}>
        {currentUser ? (
          <>

            <div className="p-4 mb-4 text-white shadow-lg"
              style={{ borderRadius: '24px', background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)' }}>
              <div className="d-flex justify-content-between mb-4">
                <div>
                  <p className="opacity-75 small mb-1 fw-medium text-uppercase">Доступный остаток</p>
                  <h1 className="fw-bold mb-0 display-6">{currentUser.balance ?? 1000} ₽</h1>
                </div>
                <i className="bi bi-cpu fs-2 opacity-50"></i>
              </div>
              <div className="d-flex justify-content-between align-items-end mt-4">
                <p className="small mb-0 font-monospace opacity-75">•••• 4567</p>
                <i className="bi bi-payfront fs-4"></i>
              </div>
            </div>

            <div className="row g-2 text-center mb-5">
              <div className="col-4">
                <Link to="/Money" className="text-decoration-none">
                  <div className="bg-white text-success p-3 rounded-circle mb-2 mx-auto shadow-sm d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                    <i className="bi bi-plus-lg fs-3"></i>
                  </div>
                  <span className="small text-dark fw-medium">Ввод</span>
                </Link>
              </div>
              <div className="col-4">
                <Link to="/dashboard" className="text-decoration-none">
                  <div className="bg-white text-primary p-3 rounded-circle mb-2 mx-auto shadow-sm d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                    <i className="bi bi-send fs-3"></i>
                  </div>
                  <span className="small text-dark fw-medium">Перевод</span>
                </Link>
              </div>
              <div className="col-4">
                <div className="bg-white text-warning p-3 rounded-circle mb-2 mx-auto shadow-sm d-flex align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
                  <i className="bi bi-grid-fill fs-3"></i>
                </div>
                <span className="small text-dark fw-medium">Сервисы</span>
              </div>
            </div>


            <h6 className="fw-bold mb-3">Последние операции</h6>
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-body p-0">
                {transactions.map(t => (
                  <div key={t.id} className="d-flex align-items-center p-3 border-bottom last-item-no-border">
                    <div className={`bg-${t.color} bg-opacity-10 text-${t.color} rounded-3 p-2 me-3`}>
                      <i className={`bi ${t.icon} fs-5`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-bold small">{t.title}</div>
                      <div className="text-muted small" style={{ fontSize: '11px' }}>{t.desc}</div>
                    </div>
                    <div className={`fw-bold text-${t.color} small`}>{t.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (

          <div className="text-center py-5">
            <div className="bg-primary bg-opacity-10 d-inline-block p-4 rounded-circle mb-4">
              <i className="bi bi-wallet2 text-primary display-4"></i>
            </div>
            <h2 className="fw-bold mb-3">Мобильный Банк</h2>
            <p className="text-muted px-4 mb-5">Управляйте своими финансами в одно касание.</p>

            <div className="d-grid gap-3 px-4 mb-5">
              <Link className="btn btn-primary btn-lg rounded-pill fw-bold py-3 shadow" to="/login">Войти в кабинет</Link>
              <Link className="btn btn-outline-primary btn-lg rounded-pill fw-bold py-3" to="/register">Регистрация</Link>
            </div>


            <div className="mx-4 p-4 bg-white border-0 shadow-sm rounded-4 text-start">
              <div className="fw-bold mb-3 d-flex align-items-center">
                <i className="bi bi-key-fill text-warning me-2"></i> Быстрый доступ:
              </div>

              <div className="small border-bottom pb-2 mb-2">
                <div className="text-dark fw-bold">admin@example.com</div>
                <div className="text-muted d-flex justify-content-between">
                  <span>Пароль: 123456</span> <span>PIN: 1234</span>
                </div>
              </div>

              <div className="small border-bottom pb-2 mb-2">
                <div className="text-dark fw-bold">user@example.com</div>
                <div className="text-muted d-flex justify-content-between">
                  <span>Пароль: password</span> <span>PIN: 1234</span>
                </div>
              </div>

              <div className="small text-muted d-flex justify-content-between">
                <span>student@example.com</span>
               
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
