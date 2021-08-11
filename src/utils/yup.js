import * as yup from "yup";

export const HomePageSchema = yup.object().shape({
  address: yup.string().required("Jobcoin Address is a required field"),
});

export const SidebarSchema = yup.object().shape({
  toAddress: yup.string().required("Destination Address is a required field"),
  amount: yup
    .number()
    .positive()
    .required()
    .typeError("Amount to Send must be a number and is required"),
});
