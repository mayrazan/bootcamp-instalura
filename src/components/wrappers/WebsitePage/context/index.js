import React from 'react';

export const WebsitePageContext = React.createContext({
  toggleModalCadastro: () => {},
  getCMSContent: (cmsKey) => cmsKey,
});

export const WebsitePageLoggedContext = React.createContext({
  data: {},
  error: '',
  loading: true,
  posts: [],
  user: {},
  username: '',
});
