/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../commons/Button';
import Box from '../../layout/Box';
import Grid from '../../layout/Grid';
import Text from '../../foundation/Text';
import ArrowIcon from '../SvgIcons/ArrowIcon';
import {
  ButtonStyled,
  CloseButton,
  ContainerInputButton,
  FormContainer,
  ImagePreview,
  ImagePreviewContainer,
  TextFieldStyled,
} from './style';

// const formStates = {
//   DEFAULT: 'DEFAULT',
//   LOADING: 'LOADING',
//   DONE: 'DONE',
//   ERROR: 'ERROR',
// };

function FormContent({ isOpen }) {
  // const [isFormSubmited, setIsFormSubmited] = React.useState(false);
  const [steps, setSteps] = React.useState(1);
  // const [submissionStatus, setSubmissionStatus] = React.useState(
  //   formStates.DEFAULT,
  // );
  const [url, setUrl] = React.useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setUrl(value);
  };

  const handleClick = () => {
    setSteps(2);
  };

  useEffect(() => {
    // if (!isOpen) {
    //   setSubmissionStatus(formStates.DEFAULT);
    // }
    setSteps(1);
    setUrl('');
  }, [isOpen]);

  return (
    <FormContainer>
      {steps === 1 ? (
        <div>
          <ContainerInputButton>
            <TextFieldStyled
              placeholder="URL da imagem"
              color="tertiary.light"
              value={url}
              onChange={handleChange}
              name="url"
            />
            <ButtonStyled variant="secondary.main" disabled={!url}>
              <ArrowIcon />
            </ButtonStyled>
          </ContainerInputButton>

          <Text variant="paragraph2">
            Formatos suportados: jpg, png, svg e xpto.
          </Text>
        </div>
      ) : (
        <div />
      )}

      <Button
        variant="primary.main"
        type="submit"
        disabled={!url}
        fullWidth
        onClick={handleClick}
      >
        {steps === 1 ? 'Avançar' : 'Postar'}
      </Button>
    </FormContainer>
  );
}

FormContent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
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
          <ImagePreviewContainer>
            <ImagePreview src="/images/image.svg" alt="" />
          </ImagePreviewContainer>
          <FormContent isOpen={isOpen} />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}

CreatePost.propTypes = {
  props: PropTypes.shape({}).isRequired,
};
