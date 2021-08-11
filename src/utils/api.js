import axios from "axios";
const { REACT_APP_ADDRESSES_ENDPOINT, REACT_APP_TRANSACTIONS_ENDPOINT } =
  process.env;

export const getAddresses = async (address) => {
  return await axios.get(`${REACT_APP_ADDRESSES_ENDPOINT}/${address}`);
};

export const getTransactions = async () => {
  return await axios.get(REACT_APP_TRANSACTIONS_ENDPOINT);
};

export const postTransactions = async (fromAddress, toAddress, amount) => {
  const data = {
    fromAddress,
    toAddress,
    amount,
  };
  return await axios.post(REACT_APP_TRANSACTIONS_ENDPOINT, data);
};
