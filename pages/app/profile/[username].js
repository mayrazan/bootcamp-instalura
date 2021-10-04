/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../../src/components/layout/Box';
import websitePageLoggedHOC from '../../../src/components/wrappers/WebsitePage/loggedArea/hoc';

function ProfileUserPage() {
  // const { postsContext } = useContextLoggedArea();
  return (
    <Box
      padding={{ xs: '24px 16px 0 11px', md: '30px 0 0' }}
      marginBottom="auto"
    >
      <span>Em construção</span>
      {/* <ProfileInfo posts={0} user={user} /> */}
      {/* <ProfilePosts posts={currentUser} username={username} /> */}
    </Box>
  );
}

export default websitePageLoggedHOC(ProfileUserPage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Perfil',
    },
    pageBoxProps: {
      backgroundColor: '#F2F2F2',
    },
    footerProps: {
      display: true,
    },
  },
});

ProfileUserPage.propTypes = {
  username: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
};

// export async function getStaticProps({ params }) {
//   const users = await userService.handleUsers();
//   console.log(users.slice(1050, 1100).reverse().filter((item) => item.username === params.username));
//   const username = users.slice(1050, 1100).reverse().filter((item) => item.username === params.username);
//   const user = await userService.getGithubInfo(params.username);

//   return {
//     props: {
//       username: username[0],
//       user,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const users = await userService.handleUsers();
//   const paths = users.map((item) => ({
//     params: { username: item.username.toString() },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }
