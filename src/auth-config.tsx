import { LogLevel } from "@azure/msal-browser";

export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_IQLInsurancePortal",
    forgotPassword: "B2C_1_IQLPasswordReset",
    editProfile: "B2C_1_IQLEditProfile",
  },
  authorities: {
    signUpSignIn: {
      authority:
        "https://iqlogisticaB2C.b2clogin.com/iqlogisticaB2C.onmicrosoft.com/B2C_1_IQLInsurancePortal",
    },
    forgotPassword: {
      authority:
        "https://iqlogisticaB2C.b2clogin.com/iqlogisticaB2C.onmicrosoft.com/B2C_1_IQLPasswordReset",
    },
    editProfile: {
      authority:
        "https://iqlogisticaB2C.b2clogin.com/iqlogisticaB2C.onmicrosoft.com/B2C_1_IQLEditProfile",
    },
  },
  authorityDomain: "iqlogisticaB2C.b2clogin.com",
};

export const msalConfig = {
  auth: {
    clientId: "b3ce7a49-3a70-4297-97b2-91e54160ad82", // This is the ONLY mandatory field that you need to supply.
    authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
    knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
    redirectUri: "/settings", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
    postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: [],
};

export const silentRequest = {
  scopes: ["openid", "profile"],
  loginHint: "example@domain.net",
};
