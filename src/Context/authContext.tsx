import React, { createContext, useState } from "react";

// Define interface for AuthContext value
interface AuthContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  cartLength: number;
  setCartlength: (cartLength: number) => void;
}

// Initial context value
const initialContextValue: AuthContextValue = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  cartLength: 0,
  setCartlength: () => {},
};
// Create context outside of component function
export const AuthContext = createContext<AuthContextValue>(initialContextValue);

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cartLength, setCartlength] = useState<number>(0);
  // Value object for context provider
  const authContextValue: AuthContextValue = {
    isLoggedIn,
    setIsLoggedIn,
    cartLength: 0,
    setCartlength,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
