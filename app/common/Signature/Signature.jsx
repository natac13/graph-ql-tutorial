import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import style from './style.scss';

function Signature(props) {
  return (
    <div className={style.wrapper}>
      <Typography variant="caption">Project by:</Typography>
      <Typography variant="body1" className={style.creator}>
        <a href={'https://github.com/natac13'} target="_blank">
          Sean P. Campbell
        </a>
      </Typography>
    </div>
  );
}

Signature.propTypes = {
  photographer: PropTypes.string.isRequired,
  photoId: PropTypes.string.isRequired,
};

export default Signature;
