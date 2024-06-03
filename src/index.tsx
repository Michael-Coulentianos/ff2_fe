import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './auth-config';
import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';
import '@fontsource/poppins';
import { GlobalStateProvider, useGlobalState } from './GlobalState';
import { getOrganizations, setAzureUserId } from "./api-ffm-service";

Providers.globalProvider = new Msal2Provider({
  clientId: 'REPLACE_WITH_CLIENTID',
});

// Instantiate MSAL outside to prevent re-renders
const msalInstance = new PublicClientApplication(msalConfig);

const InitializeApp = () => {
  const { setActiveAccount, setSelectedOrganization } = useGlobalState();

  useEffect(() => {
    const initializeActiveAccount = async () => {
      const activeAccount = msalInstance.getActiveAccount();
      const allAccounts = msalInstance.getAllAccounts();

      if (!activeAccount && allAccounts && allAccounts.length > 0) {
        msalInstance.setActiveAccount(allAccounts[0]);
      }

      const currentActiveAccount = msalInstance.getActiveAccount();
      if (currentActiveAccount) {
        setActiveAccount(currentActiveAccount);
        setAzureUserId(currentActiveAccount.localAccountId);
        
        // Fetch organizations after setting the active account
        try {
          const organizations = await getOrganizations();
          setSelectedOrganization(organizations[0]);
          console.log("Organizations fetched and set:", organizations);
        } catch (error) {
          console.error("Error fetching organizations:", error);
        }
      }
    };

    initializeActiveAccount();

    // Listen for sign-in event and set active account
    msalInstance.addEventCallback((event: any) => {
      if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        const account = event.payload.account;
        msalInstance.setActiveAccount(account);
        setActiveAccount(account);
        setAzureUserId(account.localAccountId);

        // Fetch organizations after setting the active account on login
        getOrganizations().then(organizations => {
          setSelectedOrganization(organizations[0]);
          console.log("Organizations fetched and set:", organizations);
        }).catch(error => {
          console.error("Error fetching organizations:", error);
        });
      }
    });
  }, [setActiveAccount, setAzureUserId, setSelectedOrganization]);

  return <App instance={msalInstance} />;
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <GlobalStateProvider>
      <InitializeApp />
    </GlobalStateProvider>
  </React.StrictMode>
);

reportWebVitals();
