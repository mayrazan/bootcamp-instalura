import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../../commons/Footer';
import Box from '../../../layout/Box';
import SEO from '../../../commons/SEO';

import { WebsitePageLoggedContext } from '../context';
import { useUserService } from '../../../../infra/hooks/useUserService';
import Header from '../../../authComponents/Header';
import useWindowSize from '../../../../infra/hooks/useWindowSize';

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
      }}
    >
      <SEO {...seoProps} />

      <Box display="flex" flex="1" flexDirection="column" {...pageBoxProps}>
        {menuProps.display && isDesktop && !menuProps.isFeed && (
          <Header />
        )}
        {menuProps.isFeed && (
          <Header />
        )}
        {children}
        {footerProps.display && <Footer />}
      </Box>
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
