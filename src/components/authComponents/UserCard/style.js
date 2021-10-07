import styled from 'styled-components';

export const ProfileImage = styled.img`
  border: 3.27273px solid ${({ theme }) => theme.colors.background.main.color};
  width: ${({ width }) => width || '48px'};
  height: ${({ height }) => height || '48px'};
  border-radius: 50%;
`;

export const GithubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const ProfileContainerText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerInfo = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 24px;
`;
