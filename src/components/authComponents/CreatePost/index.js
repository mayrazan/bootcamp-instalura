/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Lottie } from '@crello/react-lottie';
import Button from '../../commons/Button';
import Box from '../../layout/Box';
import Grid from '../../layout/Grid';
import Text from '../../foundation/Text';
import ArrowIcon from '../SvgIcons/ArrowIcon';
import {
  ButtonStyled,
  ButtonStyledFilter,
  CloseButton,
  ContainerInputButton,
  FormContainer,
  ImagePreview,
  ImagePreviewContainer,
  TextFieldStyled,
} from './style';
import Carousel from '../Carousel';
import { photoFilter } from '../../../utils/photoFilter';
import { userService } from '../../../services/user/userService';
import Loading from '../../commons/Loading';
import errorAnimation from '../../patterns/FormCadastro/animations/error.json';
import successAnimation from '../../patterns/FormCadastro/animations/success.json';

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

function FormContent({ isOpen, onClose }) {
  const router = useRouter();
  const [isFormSubmited, setIsFormSubmited] = React.useState(false);
  const [steps, setSteps] = React.useState(1);
  const [submissionStatus, setSubmissionStatus] = React.useState(
    formStates.DEFAULT,
  );
  const [url, setUrl] = React.useState('');
  const [post, setPost] = React.useState({
    photoUrl: '',
    description: 'Legenda do post',
    filter: 'none',
  });
  const URLValidation = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i;

  const handleChange = (event) => {
    const { value } = event.target;
    setUrl(value);
  };

  const handleClick = () => {
    setSteps(2);
  };

  const handleUrlImage = () => {
    setPost((prevState) => ({ ...prevState, photoUrl: url }));
  };

  const handleSelectFilter = (name) => {
    setPost((prevState) => ({ ...prevState, filter: name }));
  };

  const handlePost = async () => {
    setIsFormSubmited(true);
    setSubmissionStatus(formStates.LOADING);
    await userService
      .sendPost(post)
      .then(() => {
        setSubmissionStatus(formStates.DONE);
        router.push('/app/feed');
        onClose();
      })
      .catch(() => {
        setSubmissionStatus(formStates.ERROR);
      })
      .finally(() => {
        setIsFormSubmited(false);
      });
  };

  const isValidUrl = URLValidation.test(post.photoUrl);

  useEffect(() => {
    if (!isOpen) {
      setSubmissionStatus(formStates.DEFAULT);
    }
    setSteps(1);
    setUrl('');
    setPost({
      photoUrl: '',
      description: 'Legenda do post',
      filter: 'none',
    });
  }, [isOpen]);

  return (
    <>
      <ImagePreviewContainer>
        <figure
          className={`filter-${post.filter}`}
          style={{ margin: '0 16px' }}
        >
          <ImagePreview src={post.photoUrl || '/images/image.svg'} alt="" />
        </figure>
      </ImagePreviewContainer>
      <FormContainer>
        {steps === 1 ? (
          <Box display="flex" flexDirection="column" justifyContent="center">
            <ContainerInputButton>
              <TextFieldStyled
                placeholder="URL da imagem"
                color="tertiary.light"
                value={url}
                onChange={handleChange}
                name="url"
                error="URL inválida"
              />
              <ButtonStyled
                variant="secondary.main"
                disabled={!url}
                onClick={handleUrlImage}
              >
                <ArrowIcon />
              </ButtonStyled>
            </ContainerInputButton>

            {!isValidUrl && post.photoUrl && (
              <Text variant="smallestException" color="error.main" role="alert">
                URL inválida
              </Text>
            )}
            <Text variant="paragraph2">
              Formatos suportados: jpg, png, svg e xpto.
            </Text>
          </Box>
        ) : (
          <div>
            <Carousel>
              {photoFilter.map((item) => (
                <div key={item.name}>
                  <ButtonStyledFilter
                    onClick={() => handleSelectFilter(item.name)}
                  >
                    <figure
                      className={`filter-${item.name}`}
                      style={{ margin: '0 16px' }}
                    >
                      <img
                        src={post.photoUrl}
                        alt=""
                        style={{ height: '88px', width: '88px' }}
                      />
                    </figure>
                  </ButtonStyledFilter>

                  <Text variant="profileTextSM" color="tertiary.light">
                    {item.name}
                  </Text>
                </div>
              ))}
            </Carousel>
          </div>
        )}

        <Button
          variant="primary.main"
          type="submit"
          disabled={!url || !post.photoUrl || !isValidUrl}
          fullWidth
          onClick={steps === 1 ? handleClick : handlePost}
        >
          {steps === 1 ? 'Avançar' : 'Postar'}
        </Button>

        {isFormSubmited && submissionStatus === formStates.LOADING && (
          <Loading width="20px" height="20px" />
        )}

        {isFormSubmited && submissionStatus === formStates.DONE && (
          <Box display="flex" justifyContent="center">
            <Lottie
              width="20px"
              height="20px"
              config={{
                animationData: successAnimation,
                loop: true,
                autoplay: true,
              }}
            />
          </Box>
        )}

        {isFormSubmited && submissionStatus === formStates.ERROR && (
          <Box display="flex" justifyContent="center">
            <Lottie
              width="20px"
              height="20px"
              config={{
                animationData: errorAnimation,
                loop: true,
                autoplay: true,
              }}
            />
          </Box>
        )}
      </FormContainer>
    </>
  );
}

FormContent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function CreatePost({ props }) {
  const { isOpen, onClose } = props;
  const handleClose = () => {
    if (isOpen) {
      onClose();
    }
  };

  return (
    <Grid.Row marginLeft={0} marginRight={0} flex={1}>
      <Grid.Col
        display="flex"
        paddingRight={{ xs: '0', md: '0' }}
        paddingLeft={{ xs: '0', md: '0' }}
        flex={1}
        value={{ xs: 12 }}
      >
        <Box
          flexDirection="column"
          flex={1}
          backgroundColor="white"
          display="flex"
          {...props}
        >
          <CloseButton onClick={handleClose} />

          <FormContent isOpen={isOpen} />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}

CreatePost.propTypes = {
  props: PropTypes.shape({}).isRequired,
};
