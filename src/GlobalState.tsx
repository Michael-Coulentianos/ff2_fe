import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Organization } from './models/organization.interface';

interface GlobalState {
  selectedOrganization: Organization | null;
  setSelectedOrganization: (org: Organization) => void;
  activeAccount: any | null;
  setActiveAccount: (user: any) => void;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [activeAccount, setActiveAccount] = useState<any | null>(null);

  return (
    <GlobalStateContext.Provider value={{
      selectedOrganization,
      setSelectedOrganization,
      activeAccount,
      setActiveAccount,
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
