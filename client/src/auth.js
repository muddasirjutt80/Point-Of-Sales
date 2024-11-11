import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (auth) => {
    setIsAuthenticated(auth);
  };
  const value = {
    isAuthenticated,
    setAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// export function useAuth() {
//     return useContext(AuthContext);
// }
