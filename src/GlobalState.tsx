import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Organization } from './models/organization.interface';

interface GlobalState {
  selectedOrganization: Organization | null;
  setSelectedOrganization: (org: Organization) => void;
  // Add other global variables here
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  
  // Add other global state handlers here
  // const [anotherGlobalVar, setAnotherGlobalVar] = useState<AnotherType>(defaultValue);

  return (
    <GlobalStateContext.Provider value={{
      selectedOrganization,
      setSelectedOrganization,
      // Add other global state handlers here
      // anotherGlobalVar,
      // setAnotherGlobalVar,
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
