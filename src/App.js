import * as React from "react";
import AppRouter from './components/AppRouter'
import AuthContextProvider from './contexts/AuthContext'
import './App.css';

function App(props) {
  return (
    <div className="App">
      <div>
        <AuthContextProvider>
          <AppRouter />
        </AuthContextProvider>
      </div>
    </div>
  )
}

export default App;