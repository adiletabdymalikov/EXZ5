import { useState } from 'react';
import { User } from '../../User.js'; // Убедись, что путь к файлу User.js верный

export default function Money({ currentUser, setCurrentUser }) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  // Если вдруг зашли без авторизации (хотя роут должен быть приватным)
  if (!currentUser) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: 48 }}></i>
          <h4 className="fw-bold mt-2">Пожалуйста, войдите в аккаунт</h4>
        </div>
      </div>
    );
  }

  // Обработчик операций (Пополнение / Снятие)
  function handleTransaction(type) {
    setError('');
    const value = parseFloat(amount);

    // Валидация ввода
    if (isNaN(value) || value <= 0) {
      setError('Введите корректную сумму больше нуля');
      return;
    }

    // Твой текущий баланс (если его нет в объекте, ставим 1000 по умолчанию)
    const currentBalance = currentUser.balance ?? 1000;
    let newBalance = currentBalance;

    if (type === 'plus') {
      newBalance += value;
    } else if (type === 'minus') {
      // Проверка: нельзя снять больше, чем есть
      if (value > currentBalance) {
        setError('Недостаточно средств на балансе!');
        return;
      }
      newBalance -= value;
    }

    // 1. Обновляем баланс в localStorage для всех пользователей
    // (Поскольку метод updateBalance у тебя может быть не написан в User.js, 
    // давай обновим прямо здесь через localStorage)
    const allUsers = User.getAll();
    const updatedUsers = allUsers.map(u => {
      if (u.username === currentUser.username) {
        return { ...u, balance: newBalance };
      }
      return u;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    
    const updatedUser = { ...currentUser, balance: newBalance };
    localStorage.setItem('session', JSON.stringify(updatedUser));

    
    setCurrentUser(updatedUser);
    setAmount('');
  }

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            
            <div className="card border-0 shadow p-4" style={{ borderRadius: 20 }}>
              <div className="text-center mb-4">
                <i className="bi bi-wallet2 text-success" style={{ fontSize: 48 }}></i>
                <h4 className="fw-bold mt-2 mb-0">Мой кошелёк</h4>
                <p className="text-muted small">Пользователь: <strong>{currentUser.username}</strong></p>
              </div>

             
              <div className="bg-light p-3 text-center mb-4" style={{ borderRadius: 15 }}>
                <span className="text-muted small text-uppercase fw-bold">Текущий баланс</span>
                <h1 className="fw-bold text-success mt-1 mb-0">
                  {currentUser.balance ?? 1000} ₽
                </h1>
              </div>

             
              {error && (
                <div className="alert alert-danger py-2 small text-center" role="alert">
                  {error}
                </div>
              )}

             
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase">Сумма операции</label>
                <input
                  type="number"
                  className="form-control form-control-lg border-2 shadow-none"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

             
              <div className="row g-2">
                <div className="col-6">
                  <button 
                    className="btn btn-success btn-lg w-100 fw-bold py-3 shadow-sm"
                    onClick={() => handleTransaction('plus')}
                  >
                    <i className="bi bi-plus-circle me-2"></i>Пополнить
                  </button>
                </div>
                <div className="col-6">
                  <button 
                    className="btn btn-danger btn-lg w-100 fw-bold py-3 shadow-sm"
                    onClick={() => handleTransaction('minus')}
                  >
                    <i className="bi bi-dash-circle me-2"></i>Снять
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}