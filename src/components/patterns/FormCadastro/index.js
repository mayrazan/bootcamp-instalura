/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Lottie } from '@crello/react-lottie';
import errorAnimation from './animations/error.json';
import successAnimation from './animations/success.json';
import loadingAnimation from './animations/loading.json';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';
import Box from '../../layout/Box';
import Grid from '../../layout/Grid';
import Text from '../../foundation/Text';

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

function FormContent({ isOpen }) {
  const [isFormSubmited, setIsFormSubmited] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState(
    formStates.DEFAULT,
  );

  const [userInfo, setUserInfo] = React.useState({
    usuario: 'mayrazan',
    nome: 'Mayra',
  });

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
  }

  const isFormInvalid = userInfo.usuario.length === 0 || userInfo.nome.length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsFormSubmited(true);
    setSubmissionStatus(formStates.LOADING);

    // Data Transfer Object
    const userDTO = {
      username: userInfo.usuario,
      name: userInfo.nome,
    };

    fetch('https://instalura-api.vercel.app/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDTO),
    })
      .then((respostaDoServidor) => {
        if (respostaDoServidor.ok) {
          return respostaDoServidor.json();
        }

        throw new Error('Não foi possível cadastrar o usuário agora :(');
      })
      .then((respostaConvertidaEmObjeto) => {
        setSubmissionStatus(formStates.DONE);
        // eslint-disable-next-line no-console
        console.log(respostaConvertidaEmObjeto);
      })
      .catch((error) => {
        setSubmissionStatus(formStates.ERROR);
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  useEffect(() => {
    if (!isOpen) {
      setSubmissionStatus(formStates.DEFAULT);
    }
  }, [isOpen]);

  return (
    <form onSubmit={handleSubmit}>
      <Text variant="title" tag="h1" color="tertiary.main">
        Pronto para saber da vida dos outros?
      </Text>
      <Text
        variant="paragraph1"
        tag="p"
        color="tertiary.light"
        marginBottom="32px"
      >
        Você está a um passo de saber tudoo que está rolando no bairro, complete
        seu cadastro agora!
      </Text>

      <div>
        <TextField
          placeholder="Nome"
          name="nome"
          value={userInfo.nome}
          onChange={handleChange}
        />
      </div>

      <div>
        <TextField
          placeholder="Usuário"
          name="usuario"
          value={userInfo.usuario}
          onChange={handleChange}
        />
      </div>

      <Button
        variant="primary.main"
        type="submit"
        disabled={isFormInvalid}
        fullWidth
      >
        Cadastrar
      </Button>

      {isFormSubmited && submissionStatus === formStates.LOADING && (
        <Box display="flex" justifyContent="center">
          <Lottie
            width="250px"
            height="250px"
            config={{
              animationData: loadingAnimation,
              loop: true,
              autoplay: true,
            }}
          />
        </Box>
      )}

      {isFormSubmited && submissionStatus === formStates.DONE && (
        <Box display="flex" justifyContent="center">
          <Lottie
            width="150px"
            height="150px"
            config={{
              animationData: successAnimation,
              loop: true,
              autoplay: true,
            }}
          />
          {/* https://lottiefiles.com/43920-success-alert-icon */}
        </Box>
      )}

      {isFormSubmited && submissionStatus === formStates.ERROR && (
        <Box display="flex" justifyContent="center">
          <Lottie
            width="150px"
            height="150px"
            config={{
              animationData: errorAnimation,
              loop: true,
              autoplay: true,
            }}
          />
        </Box>
      )}
    </form>
  );
}

// eslint-disable-next-line react/prop-types
export default function FormCadastro({ propsDoModal }) {
  return (
    <Grid.Row marginLeft={0} marginRight={0} flex={1} justifyContent="flex-end">
      <Grid.Col
        display="flex"
        paddingRight={{ md: '0' }}
        flex={1}
        value={{ xs: 12, md: 5, lg: 4 }}
      >
        <Box
          boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flex={1}
          padding={{
            xs: '16px',
            md: '85px',
          }}
          backgroundColor="white"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...propsDoModal}
        >
          <FormContent isOpen={propsDoModal.isOpen} />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}
