import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../../layout/Box';
import SEO from '../../../commons/SEO';

import { WebsitePageLoggedContext } from '../context';
import { useUserService } from '../../../../infra/hooks/useUserService';
import Header from '../../../authComponents/Header';
import useWindowSize from '../../../../infra/hooks/useWindowSize';
import MobileFooter from '../../../authComponents/MobileFooter';

export const useContextLoggedArea = () => React.useContext(WebsitePageLoggedContext);

export default function WebsitePageLoggedWrapper({
  children,
  seoProps,
  pageBoxProps,
  menuProps,
  footerProps,
}) {
  const { response, user } = useUserService();
  const { isDesktop } = useWindowSize();

  return (
    <WebsitePageLoggedContext.Provider
      value={{
        data: response.data,
        error: response.error,
        loading: response.loading,
        user: user.data,
        username: user.data?.username,
      }}
    >
      <SEO {...seoProps} />
      {user.loading || response.loading ? (
        <div>carregando</div>
      ) : (
        <Box display="flex" flex="1" flexDirection="column" {...pageBoxProps}>
          {menuProps.display && isDesktop && !menuProps.isFeed && (
            <Header username={user.data?.username} />
          )}
          {menuProps.isFeed && <Header username={user.data?.username} />}
          {children}
          {footerProps.display && !isDesktop && <MobileFooter username={user.data?.username} />}
        </Box>
      )}
    </WebsitePageLoggedContext.Provider>
  );
}

WebsitePageLoggedWrapper.defaultProps = {
  seoProps: {},
  pageBoxProps: {},
  menuProps: {
    display: true,
    isFeed: false,
  },
  footerProps: {
    display: false,
  },
};

WebsitePageLoggedWrapper.propTypes = {
  seoProps: PropTypes.shape({
    headTitle: PropTypes.string,
  }),
  menuProps: PropTypes.shape({
    display: PropTypes.bool,
    isFeed: PropTypes.bool,
  }),
  footerProps: PropTypes.shape({
    display: PropTypes.bool,
  }),
  pageBoxProps: PropTypes.shape({
    backgroundColor: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};
