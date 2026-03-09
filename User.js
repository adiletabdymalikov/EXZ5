
export class User {
  constructor(username, password) {
    this.username = username
    this.password = password
    this.createdAt = new Date().toLocaleString('ru-RU')
  }

 
  checkPassword(password) {
    return this.password === password
  }
static deleteUser(username) {
  let users = User.getAll()

  
  users = users.filter(u => u.username !== username)

  
  localStorage.setItem("users", JSON.stringify(users))

  
  const session = localStorage.getItem("session")
  if (session === username) {
    User.clearSession()
  }
}
  
  save() {
    const users = User.getAll()

    if (users.find(u => u.username === this.username)) {
      throw new Error('Пользователь уже существует')
    }

    users.push({
      username: this.username,
      password: this.password,
      createdAt: this.createdAt
    })

    localStorage.setItem('users', JSON.stringify(users))
  }

  
  static getAll() {
    return JSON.parse(localStorage.getItem('users') || '[]')
  }

  
  static findByUsername(username) {
    const data = User.getAll().find(u => u.username === username)
    if (!data) return null

    const user = new User(data.username, data.password)
    user.createdAt = data.createdAt
    return user
  }

  
  static saveSession(username) {
    localStorage.setItem('session', username)
  }

  
  static getSession() {
    const username = localStorage.getItem('session')
    if (!username) return null
    return User.findByUsername(username)
  }

 
  static clearSession() {
    localStorage.removeItem('session')
  }

  
  static initTestAccounts() {
    const users = User.getAll()

    
    if (!users || users.length === 0) {
      const testUsers = [
        { username: "admin@example.com", password: "123456" },
        { username: "user@example.com", password: "password" },
        { username: "student@example.com", password: "student123" }
      ]

      localStorage.setItem("users", JSON.stringify(
        testUsers.map(u => ({
          ...u,
          createdAt: new Date().toLocaleString('ru-RU')
        }))
      ))
    }
  }
}


User.initTestAccounts()