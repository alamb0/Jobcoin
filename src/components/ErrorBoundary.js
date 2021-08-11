import React, { Component } from "react";
import styled from "styled-components";

const ErrorMessage = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// React hooks currently do not support getDerivedStateFromError or componentDidCatch
// See https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
// and https://reactjs.org/docs/error-boundaries.html
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage>An error occurred</ErrorMessage>;
    }

    return this.props.children;
  }
}
