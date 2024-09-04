import React from 'react';
import { Button, Result } from 'antd';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(err) {
    // Update state to render fallback UI
    return { hasError: true, error: err };
  }

  componentDidCatch(error, errorInfo) {
    // Log error information for debugging purposes
    this.state.error = error;
    console.error('Error caught by Error Boundary:', error);
    console.error('Error info:', errorInfo);
    // You can also send error information to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if an error occurred
      return (
        <Result
          status='error'
          title='Something went wrong'
          subTitle={this.state.error.message}
          extra={
            <Button
              type='primary'
              onClick={() => window.location.reload()}
            >
              Go Back
            </Button>
          }
        />
      );
    }

    // Render children if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
