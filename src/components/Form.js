import styled from "styled-components";

export const Box = styled.div`
  border: solid 1px gray;
  border-radius: 5px;
  margin: 20px;
  min-width: 100px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.h3`
  width: 245px;
  padding: 20px;
  margin: auto;
  text-align: center;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: xx-small;
  color: ${(props) => (props.isValid ? "red" : "black")};
`;

export const Input = styled.input`
  border: ${(props) => (props.isValid ? "solid 1px red" : "solid 1px black")};
`;

export const ErrorMessage = styled.p`
  font-size: xx-small;
  color: red;
`;

export const Button = styled.button`
  width: 100%;
  margin: auto;
  padding: 10px;
`;
