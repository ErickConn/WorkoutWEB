import React, { createContext, useState } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'info', duration = 3000) => {
    setAlert({ message, type });
    if (duration) {
      setTimeout(() => setAlert(null), duration);
    }
  };

  const closeAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ alert, showAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
