import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './auth-config';
import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';
import '@fontsource/poppins';
import { GlobalStateProvider } from './GlobalState';

Providers.globalProvider = new Msal2Provider({
  clientId: 'REPLACE_WITH_CLIENTID',
});

// Instantiate MSAL outside to prevent re-renders
const msalInstance = new PublicClientApplication(msalConfig);
const activeAccount = msalInstance?.getActiveAccount();
const allAccounts = msalInstance?.getAllAccounts();

if (!activeAccount && allAccounts && allAccounts.length > 0) {
  // Account selection logic
  msalInstance.setActiveAccount(allAccounts[0]);
}

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event: any) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStateProvider>
      <App instance={msalInstance} />
    </GlobalStateProvider>
  </React.StrictMode>
);

reportWebVitals();
