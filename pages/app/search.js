import React from 'react';
import Box from '../../src/components/layout/Box';
import websitePageLoggedHOC from '../../src/components/wrappers/WebsitePage/loggedArea/hoc';
import { authService } from '../../src/services/auth/authService';
import { userService } from '../../src/services/user/userService';
import { useContextLoggedArea } from '../../src/components/wrappers/WebsitePage/loggedArea';
import UserCard from '../../src/components/authComponents/UserCard';
import Text from '../../src/components/foundation/Text';
import TextField from '../../src/components/forms/TextField';

function SearchPage() {
  const { filter, userSearch, handleChange } = useContextLoggedArea();
  return (
    <Box
      padding={{ xs: '24px 16px 0 11px', md: '30px 20px' }}
      gap="24px"
      marginBottom="auto"
      display="flex"
      flexDirection="column"
    >
      <TextField
        placeholder="Pesquisar"
        name="search"
        value={userSearch}
        onChange={handleChange}
        type="search"
        margin="0"
      />
      {userSearch ? (
        filter.map((item) => (
          <UserCard
            src="/icons/avatar.png"
            url={`https://github.com/${item.username}`}
            user={item}
            key={item.username}
          />
        ))
      ) : (
        <Text tag="h4" textAlign="center" margin="0" variant="titleXS">
          Pesquise por um usuário.
        </Text>
      )}
    </Box>
  );
}

export default websitePageLoggedHOC(SearchPage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Pesquisa',
    },
    pageBoxProps: {
      backgroundColor: '#F2F2F2',
    },
    footerProps: {
      display: true,
    },
  },
});

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const profilePage = await userService.getProfilePage(ctx);
    const profileInfo = await userService.getProfileInfo(ctx);
    const currentUser = profilePage.posts.filter(
      (item) => item.user === profileInfo.user.id,
    );

    return {
      props: {
        user: profileInfo.user,
        posts: currentUser,
        postsNumber: currentUser.length,
        isAuth: hasActiveSession,
        username: profileInfo.user.username,
      },
    };
  }

  ctx.res.writeHead(307, { location: '/app/login' });
  ctx.res.end();

  return {
    props: {},
  };
}
