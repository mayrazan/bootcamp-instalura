/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Lottie } from '@crello/react-lottie';
import Box from '../../layout/Box';
import Text from '../../foundation/Text';
import HeartIcon from '../SvgIcons/HeartIcon';
import {
  PostImage,
  ProfileContainer,
  ProfileIcon,
  ContainerInfo,
  ContainerIcons,
  ButtonStyled,
  LikeWrapper,
  LikeStyled,
} from './style';
import { userService } from '../../../services/user/userService';
import likeAnimation from '../../commons/animations/like.json';

export default function FeedPost({ post, user }) {
  const [likes, setLikes] = useState({});
  const [totalLikes, setTotalLikes] = useState(post.likes.length);

  useEffect(() => {
    const likesPost = post.likes.find((like) => like.user === user.id);
    setLikes(likesPost);
  }, []);

  const handleLike = async (id) => {
    const postSelected = await post.likes.find((like) => like.user === user.id);
    const response = await userService.setLike(id);
    if (!response) {
      setLikes(!likes);
      setTotalLikes(totalLikes - 1);
    } else {
      setLikes({ ...likes, postSelected });
      setTotalLikes(totalLikes + 1);
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor="#FFFFFF"
      border="0.797694px solid #F1F1F1"
    >
      <div>
        <ProfileContainer>
          <ProfileIcon src={user.avatar} alt="" />
          <Text variant={{ xs: 'profileMobile', md: 'profile' }}>
            {user.username}
          </Text>
        </ProfileContainer>
      </div>

      <LikeWrapper>
        <PostImage
          src={post.photoUrl}
          alt=""
          loading="lazy"
          className={`filter-${post.filter}`}
        />
        <LikeStyled>
          <ButtonStyled ghost onClick={() => handleLike(post._id)}>
            <Lottie
              width="200px"
              height="200px"
              playingState={likes ? 'playing' : 'stopped'}
              config={{
                animationData: likeAnimation,
                loop: false,
                autoplay: false,
              }}
            />
          </ButtonStyled>
        </LikeStyled>
      </LikeWrapper>

      <ContainerInfo>
        <ContainerIcons>
          <ButtonStyled ghost onClick={() => handleLike(post._id)}>
            <HeartIcon color={Boolean(likes)} />
          </ButtonStyled>

          <Text variant={{ xs: 'profileMobile', md: 'like' }}>
            {totalLikes}
          </Text>
        </ContainerIcons>
        <div>
          <Text>{post.description}</Text>
        </div>
      </ContainerInfo>
    </Box>
  );
}

FeedPost.propTypes = {
  post: PropTypes.shape({
    photoUrl: PropTypes.string,
    filter: PropTypes.string,
    _id: PropTypes.string,
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        length: PropTypes.number,
      }),
    ),
    description: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
