import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const Loading = ({ error, pastDelay, retry }) => {
  if (error) {
    return (
      <div>
        Error!{' '}
        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={retry}
        >
          Retry
        </Button>
      </div>
    );
  }
  if (pastDelay) {
    return <CircularProgress />;
  }
  return null;
};

export default Loading;
