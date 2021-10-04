/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text from '../../foundation/Text';
import Box from '../../layout/Box';
import { userService } from '../../../services/user/userService';
import UserCard from '../UserCard';

export default function FeedUsers({ user }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService
      .handleUsers()
      .then((res) => setUsers(res.slice(0, 2).map((item) => item)));
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <UserCard height="64px" width="64px" user={user} />

      <Text variant="profileSM" color="tertiary.light" textAlign="center">
        Projetos da Galera
      </Text>

      {users.map((item) => (
        <UserCard
          user={item}
          key={item._id}
          src={`https://github.com/${item.username}.png`}
          url={`https://github.com/${item.username}`}
        />
      ))}
    </Box>
  );
}

FeedUsers.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};
