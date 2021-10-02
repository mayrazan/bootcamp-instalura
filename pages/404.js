import React from 'react';
import { Lottie } from '@crello/react-lottie';
import Text from '../src/components/foundation/Text';
import notFound from '../src/components/commons/animations/notFound.json';
import Box from '../src/components/layout/Box';
import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';

function Page404() {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        margin="auto"
      >
        <Lottie
          width="100%"
          height="450px"
          config={{
            animationData: notFound,
            loop: true,
            autoplay: true,
          }}
        />
        <Text
          tag="h4"
          textAlign="center"
          margin="0"
          variant="titleXS"
        >
          Página não encontrada
        </Text>
      </Box>
    </>
  );
}

export default websitePageHOC(Page404, {
  pageWrapperProps: {
    seoProps: {
      headTitle: '404',
    },
  },
});
