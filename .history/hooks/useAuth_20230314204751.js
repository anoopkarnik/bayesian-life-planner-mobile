import React, { createContext, useContext } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value={null}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
    return useContext(AuthContext);
}