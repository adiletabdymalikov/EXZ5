import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { User } from '../User.js'
import { Navbar } from './components/Navbar.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'

import { ProfilePage } from './pages/ProfilePage.jsx'
import Money from './pages/Money.jsx' 


function PrivateRoute({ currentUser, children }) {
  return currentUser ? children : <Navigate to="/login" />
}


export default function App() {
  const [currentUser, setCurrentUser] = useState(() => User.getSession())

  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} />} />
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
  
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Money" element={<Money currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/dashboard" element={
          <PrivateRoute currentUser={currentUser}>
            <DashboardPage currentUser={currentUser} />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute currentUser={currentUser}>
            <ProfilePage currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}