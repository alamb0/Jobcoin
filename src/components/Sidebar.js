import React, { useState } from "react";
import { SidebarSchema } from "../utils/yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAddresses, postTransactions } from "../utils/api";
import { Box, Button, Form, Input, Label, ErrorMessage, Header } from "./Form";

export default function Sidebar({
  fromAddress,
  balance,
  setTransactions,
  setBalance,
}) {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SidebarSchema),
  });

  const onSubmit = async (data) => {
    setError(null);
    try {
      await postTransactions(fromAddress, data.toAddress, data.amount);
      const res = await getAddresses(fromAddress);
      const { balance, transactions } = res.data;
      setTransactions(transactions);
      setBalance(balance);
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <div>
      <Box>
        <Header>Jobcoin Balance</Header>
        <hr />
        <Header>{balance}</Header>
      </Box>
      <Box>
        <Header>Send Jobcoin</Header>
        <hr />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="toAddress" isValid={errors.toAddress}>
            Destination Address
          </Label>
          <Input
            id="toAddress"
            name="toAddress"
            type="text"
            isValid={errors.toAddress}
            {...register("toAddress")}
          ></Input>
          <ErrorMessage>{errors.toAddress?.message}</ErrorMessage>
          <Label htmlFor="amount" isValid={errors.amount}>
            Amount to Send
          </Label>
          <Input
            id="amount"
            name="amount"
            type="text"
            isValid={errors.amount}
            {...register("amount")}
          ></Input>
          <ErrorMessage>{errors.amount?.message}</ErrorMessage>
          <Button type="submit" disabled={errors.toAddress || errors.amount}>
            Send Jobcoins
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </Box>
    </div>
  );
}
