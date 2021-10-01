/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

import WebsitePageLoggedWrapper from '..';
import WebsiteGlobalProvider from '../../provider';

export default function websitePageLoggedHOC(
  PageComponent,
  { pageWrapperProps } = { pageWrapperProps: {} },
) {
  return (props) => (
    <WebsiteGlobalProvider>
      <WebsitePageLoggedWrapper
        {...pageWrapperProps}
        {...props.pageWrapperProps}
      >
        <PageComponent {...props} />
      </WebsitePageLoggedWrapper>
    </WebsiteGlobalProvider>
  );
}
