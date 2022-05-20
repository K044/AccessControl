import React, { createContext, useContext, useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../utils/init-firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset,
} from 'firebase/auth'

const AuthContext = createContext({
  currentUser: null,
  userRole: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
  getUserInfo: null,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const docRef = doc(db, "users", user.uid.toString());
        const docSnap = await getDoc(docRef);
        setUserRole(docSnap.data().role || 0);
      }
      setCurrentUser(user ? user : false)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('The user is', currentUser)
  }, [currentUser])

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://https://accesscontrol-1802c.web.app/login`,
    })
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  function logout() {
    return signOut(auth)
  }
  
  async function getUserInfo(){
    const docRef = doc(db, "users", auth.currentUser.uid.toString())
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  }

  const value = {
    currentUser,
    userRole,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    getUserInfo,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}