import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HomePageSchema } from "../utils/yup";
import { getAddresses } from "../utils/api";
import {
  Box,
  Header,
  Button,
  Form,
  Input,
  Label,
  ErrorMessage,
} from "../components/Form";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  width: 100px;
  height: 100px;
  border: solid grey;
  border-radius: 50%;
`;

export default function Home() {
  const [error, setError] = useState(null);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(HomePageSchema),
  });

  useEffect(() => {
    document.title = "Home - Jobcoin";
  }, []);

  const onSubmit = async (data) => {
    setError(null);
    try {
      const res = await getAddresses(data.address);
      const { balance, transactions } = res.data;
      if (balance === "0" && !transactions.length) {
        setError("Address does not exist");
      } else {
        history.push({
          pathname: "account",
          state: { address: data.address },
        });
      }
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <HomeWrapper>
      <Icon>{/* <img src={} alt="Jobcoin Logo" /> */}</Icon>
      <Box>
        <Header>Welcome! Sign In With Your Jobcoin Address</Header>
        <hr />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="address" isValid={errors.address}>
            Jobcoin Address
          </Label>
          <Input
            id="address"
            name="address"
            type="text"
            isValid={errors.address}
            {...register("address")}
          ></Input>
          <ErrorMessage>{errors.address?.message}</ErrorMessage>
          <Button type="submit" disabled={errors.address}>
            Sign In
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </Box>
    </HomeWrapper>
  );
}
