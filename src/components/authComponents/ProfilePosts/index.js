/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../layout/Box';
import Grid from '../../layout/Grid';
import HeartIcon from '../SvgIcons/HeartIcon';
import { PostImage, ContainerImage, LikeStyled } from './style';
import Text from '../../foundation/Text';

export default function ProfilePosts({ posts }) {
  return (
    <Box display="flex" flexDirection="column" flex={1}>
      {!posts.length ? (
        <Box display="flex" justifyContent="center" marginTop="50px">
          <Text tag="h4" textAlign="center" margin="0" variant="titleXS">
            Não há posts ainda.
          </Text>
        </Box>
      ) : (
        <Grid.Container display="flex" flexWrap="wrap">
          <Grid.Row marginTop={{ xs: '32px', md: '40px' }} flex="1">
            {posts.map((item) => (
              <Grid.Col
                value={{ xs: 3 }}
                flex={1}
                display="flex"
                justifyContent="center"
                offset={{ xs: 1 }}
                key={item._id}
              >
                <ContainerImage>
                  <PostImage src={item.photoUrl} alt="" loading="lazy" />
                  <LikeStyled>
                    <HeartIcon />
                    {item.likes.length}
                  </LikeStyled>
                </ContainerImage>
              </Grid.Col>
            ))}
          </Grid.Row>
        </Grid.Container>
      )}
    </Box>
  );
}

ProfilePosts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      photoUrl: PropTypes.string,
      likes: PropTypes.arrayOf(
        PropTypes.shape({
          length: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
};
