import React from 'react'
import './App.scss'
import UsersList from './UsersList/UsersList.js'

export const App = () => (
  <div>
    <UsersList users={['bob', 'joe', 'jeff']} />
  </div>
)

export default App
