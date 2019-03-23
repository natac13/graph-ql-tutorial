import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Typography from '@material-ui/core/Typography';

import style from './style.scss';

function Header(props) {
  const { title, className } = props;
  const wrapperClass = classnames({
    [style.header]: true,
    [className]: !!className,
  });

  return (
    <header className={wrapperClass}>
      <Typography variant="h2" className={style.title} gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" className={style.creator}>
        <a href="https://github.com/natac13">Created by: Sean Campbell</a>
      </Typography>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

Header.defaultProps = {
  className: undefined,
  title: 'New App!',
};

export default Header;
