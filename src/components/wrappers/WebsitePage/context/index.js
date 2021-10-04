import React from 'react';

export const WebsitePageContext = React.createContext({
  toggleModalCadastro: () => {},
  getCMSContent: (cmsKey) => cmsKey,
});

export const WebsitePageLoggedContext = React.createContext({
  data: {},
  postsContext: [],
  user: {},
  username: '',
  filter: {},
  handleChange: () => {},
  users: {},
  userSearch: '',
});
