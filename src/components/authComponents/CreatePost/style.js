import styled from 'styled-components';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';

export const CloseButton = styled.div`
  background: url('/icons/close-icon.png') no-repeat;
  background-size: contain;
  width: 24px;
  height: 24px;
  align-self: flex-end;
  background-color: white;
  cursor: pointer;
  margin: 16px;
`;

export const ImagePreviewContainer = styled.div`
  background-color: #d5d5d5;
  width: 375px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 375px;
  height: 100%;
`;

export const ImagePreview = styled.img`
  width: 184px;
  height: 184px;
`;

export const FormContainer = styled.div`
  padding: 48px 24px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 38px;
`;

export const TextFieldStyled = styled(TextField)`
  border: 0;
  flex: 1;
`;

export const ContainerInputButton = styled.div`
  display: flex;
  box-sizing: border-box;
  border-radius: 10px;
  height: 48px;
  border: 1px solid #88989e;
  margin: 0 0 8px;
`;

export const ButtonStyled = styled(Button)`
  width: 48px;
  border: none;
  padding: 0;
  outline: 0;
`;

export const ButtonStyledFilter = styled(Button)`
  border: none;
  padding: 0;
  outline: 0;
  background: none;
  display: flex;
  flex-direction: column;
`;
