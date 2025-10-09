import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserData = (userData) => {
    if (!userData)
      setUser(null)
    else
      setUser({
        id: userData.uuid,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
      });
  };

  const contextValue = {
    user,
    setUserData,
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
