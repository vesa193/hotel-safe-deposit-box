const appConfig = {
  theme: {
    nav: {
      label: 'react-app',
    },
    showHeaderOnAuthRoutes: true,
    showInputIconsOnLogin: false,
    routesWithoutStaticHeader: ['/item-details'],
  },
  api: {
    baseURL: 'https://hybrid-master.herokuapp.com',
    // baseURL: 'http://192.168.0.150:8000', //marko
    // baseURL: 'http://192.168.0.26:8000', //balsa
    wordPressBaseURL: 'https://hybridapp.co.uk',
  },
  general: {
    clientName: 'react-app',
    appExitRoutes: ['/', '/home', '/dashboard'],
    authRoutes: ['/login', '/register', '/reset-password'],
    isReduxDevToolsOn: true,
    isWebPlatform: false,
    defaultServiceCharge: 12.0,
  },
  appType: {
    hasOrdering: true,
    hasLoyalty: true,
    hasEmailValidationEnabled: true,
    hasCampaignManager: true,
    referAFriend: true,
    hasCancelOrder: true,
    hasServiceCharge: true,
    hasUnlockRewardsOnLoyalty: false,
    isReward: false,
    oldLayoutConfirmationScreens: false,
  },
};

export const updateConfig = (newConfig) => newConfig;

export const getConfig = () => appConfig;

export default appConfig;
