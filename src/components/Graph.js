import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { Box } from "./Form";

const GraphWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TooltipWrapper = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 5px;
`;

const DetailsTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipWrapper>
        <p>
          <b>Transaction Date:</b>
          {`${label}`}
        </p>
        <p>
          <b>Balance:</b>
          {`${payload[0].value}`}
        </p>
        <p>
          <b>To:</b>
          {`${payload[0].payload.toAddress}`}
        </p>
        <p>
          <b>From:</b>
          {`${payload[0].payload.fromAddress || "(new)"}`}
        </p>
        <p>
          <b>Amount Sent:</b>
          {`${payload[0].payload.amount}`}
        </p>
      </TooltipWrapper>
    );
  }

  return null;
};

export default function Graph({ transactions }) {
  const [transactionsBalance, setTransactionsBalance] = useState();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    if (transactions.length) {
      let balance = Number(transactions[0].amount);
      const address = transactions[0].toAddress;
      const temp = transactions.map((t, i) => {
        if (t.toAddress === address && i !== 0) {
          balance += Number(t.amount);
        } else if (t.fromAddress === address && i !== 0) {
          balance -= Number(t.amount);
        }
        t.timestamp = moment(t.timestamp).format("MM/DD/YY");
        t.balance = balance;
        return t;
      });
      setTransactionsBalance(temp);
    }
  }, [transactions]);

  return (
    <GraphWrapper>
      <Box>
        <h3>Jobcoin History Graph</h3>
        <p>Hover over each data point for more details</p>
        {isTabletOrMobile ? (
          <ResponsiveContainer width="95%" height={500}>
            <LineChart width={1000} height={500} data={transactionsBalance}>
              <Line type="linear" dataKey="balance" stroke="#26ddf9" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="timestamp" />
              <Tooltip content={<DetailsTooltip />} />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <LineChart width={1000} height={500} data={transactionsBalance}>
            <Line type="linear" dataKey="balance" stroke="#26ddf9" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" />
            <Tooltip content={<DetailsTooltip />} />
            <YAxis />
          </LineChart>
        )}
      </Box>
    </GraphWrapper>
  );
}
