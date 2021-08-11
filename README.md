# Gemini - Jobcoin

Austin Lamb  
https://jobcoin.gemini.com/crucial-tingling

# How to Run

Please install node modules first and then run the application locally. This should open the application at http://localhost:3000. An `.env` file is included with API endpoints for possible use with different environments.

```bash
npm i
npm start
```

You can preview expected `.env` variables in the `.env.example` file.
| Environment Variable            | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| REACT_APP_TRANSACTIONS_ENDPOINT | https://jobcoin.gemini.com/crucial-tingling/api#transactions |
| REACT_APP_ADDRESSES_ENDPOINT    | https://jobcoin.gemini.com/crucial-tingling/api#addresses    |

# Pages

## Homepage

Consists of a form that takes in an address and goes to account page. Requires a valid address.

## Account/Graph page

The graph is a line chart that displays the account balance over time. The transactions could be displayed in a list or in a table but the transactions data from the API did not return a balance at each transaction.
To display the balance, the original amount when created was used to subtract or add to the balance based on if the account was the sender or receiver of each transaction.

The balance of the users address is displayed and the balance and graph update when sending Jobcoins. The form requires a string for address and number for amount, to allow integers and floating point numbers, and users are notified if they try to send Jobcoin with no balance. The sign out link in the navbar returns to home page.

# Setup

App created with Create React App and VS Code snippets from https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

# Dependencies

- React Router
- Styled Components
- Axios
- Moment
- React Hook Form - used to handle form state and validation and display error messages
- Yup - used for schema validation of form inputs
- Recharts - used line chart to display balance over time
- React Responsive - used to put Recharts in its provided ResponsiveContainer on a small screen size

# Postman

There is an included Postman collection `Jobcoin.postman_collection.json` to test API calls. To use select Import in Postman and load the collection.

# Future State / Improvements

There are a few things that could be added to improve the current application

- The graph page could have a selector to limit how much data is shown such as 1 Day, 7 Day, etc.
- The address is passed from the home page through react router state to the account page but this could be improved to allow the account page to load on its own without being navigated to. This could be a query parameter or global state variable.
- The API calls are separated out to the `utils/api.js` file but the setting of loading, success, and error state is done in the component where the API is called. Also the reloading of account balance and transactions are passed as props but both of these things could be updated with useContext and useReducer hooks, or a library like Redux or React Query.
- Loading status could be replaced with a Spinner or Skeleton.
- The page title is set in a useEffect but there are libraries like React Helmet that update the title and meta tags.
- Styling, formatting, and overall responsiveness could be improved.
