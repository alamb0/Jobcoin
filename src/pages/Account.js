import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Graph from "../components/Graph";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getAddresses } from "../utils/api";

const AccountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Message = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Account({ location }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { state } = location;
  const [balance, setBalance] = useState("0.00");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    document.title = "Jobcoin - Account";
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const res = await getAddresses(state.address);
        const { balance, transactions } = res.data;
        setBalance(balance);
        setTransactions(transactions);
        setLoading(false);
      } catch (error) {
        setBalance("0.00");
        setTransactions([]);
        setLoading(false);
        setError(true);
      }
    };
    setLoading(true);
    getBalance();
  }, [state]);

  if (loading) {
    return <Message>Loading</Message>;
  }

  return (
    <>
      <Navbar />
      {error ? (
        <Message>Error</Message>
      ) : (
        balance &&
        transactions && (
          <AccountWrapper>
            <Sidebar
              balance={balance}
              fromAddress={state.address}
              setTransactions={setTransactions}
              setBalance={setBalance}
            />
            <Graph transactions={transactions} />
          </AccountWrapper>
        )
      )}
    </>
  );
}
