import React, { createContext, useState, useContext } from 'react';


export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser({ id: userData.id, username: userData.username });
    
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue = {
    user,
    login,
    logout,
    isLoggedIn: !!user,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  
return useContext(UserContext);
};