import React, { createContext, useState } from 'react';

export const UserNameContext = createContext();

export const UserNameProvider = ({ children }) => {
  const [nombreApoderado, setNombreApoderado] = useState(null);

  return (
    <UserNameContext.Provider value={{ nombreApoderado, setNombreApoderado }}>
      {children}
    </UserNameContext.Provider>
  );
};