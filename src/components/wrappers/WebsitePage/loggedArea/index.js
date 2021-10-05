import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '../../../layout/Box';
import SEO from '../../../commons/SEO';

import { WebsitePageLoggedContext } from '../context';
import { useUserService } from '../../../../infra/hooks/useUserService';
import Header from '../../../authComponents/Header';
import useWindowSize from '../../../../infra/hooks/useWindowSize';
import MobileFooter from '../../../authComponents/MobileFooter';
import Loading from '../../../commons/Loading';
import { useUserSearch } from '../../../../infra/hooks/useUserSearch';
import ModalPost from '../../../authComponents/ModalPost';
import CreatePost from '../../../authComponents/CreatePost';

export const useContextLoggedArea = () => useContext(WebsitePageLoggedContext);

export default function WebsitePageLoggedWrapper({
  children,
  seoProps,
  pageBoxProps,
  menuProps,
  footerProps,
}) {
  const { response, user } = useUserService();
  const {
    filter, handleChange, users, userSearch,
  } = useUserSearch();
  const { isDesktop } = useWindowSize();
  const [isModalOpen, setModalState] = React.useState(false);

  const toggleModalPost = () => setModalState(!isModalOpen);

  return (
    <WebsitePageLoggedContext.Provider
      value={{
        data: response.data,
        user: user.data,
        username: user.data?.username,
        postsContext: response.data?.posts,
        filter: filter?.data,
        handleChange,
        users: users?.data,
        userSearch,
        toggleModalPost,
      }}
    >
      <SEO {...seoProps} />
      {user.loading || response.loading || users.loading || filter.loading ? (
        <Loading />
      ) : (
        <Box display="flex" flex="1" flexDirection="column" {...pageBoxProps}>
          {menuProps.display && isDesktop && !menuProps.isFeed && (
            <Header
              username={user.data?.avatar}
              onChange={handleChange}
              value={userSearch}
              toggleModalPost={toggleModalPost}
            />
          )}
          {menuProps.isFeed && (
            <Header
              username={user.data?.avatar}
              onChange={handleChange}
              value={userSearch}
              toggleModalPost={toggleModalPost}
            />
          )}
          <ModalPost
            isOpen={isModalOpen}
            onClose={() => {
              setModalState(false);
            }}
          >
            {(props) => <CreatePost props={props} />}
          </ModalPost>
          {children}
          {footerProps.display && !isDesktop && (
            <MobileFooter
              username={user.data?.avatar}
              toggleModalPost={toggleModalPost}
            />
          )}
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
