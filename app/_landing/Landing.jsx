import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Header from './components/Header';

import style from './style.scss';

const Landing = props => {
  return (
    <div className={style.page}>
      <Paper className={style.wrapper}>
        <Header title="App Title" className={style.header} />
        <section className={style.description}>
          <Typography variant="h5" align="center">
            Welcome to my React boilerplate.
          </Typography>
          <Typography variant="body1" align="center">
            Created by: Sean Campbell
          </Typography>
        </section>
        <section className={style.cta}>
          <Button variant="outlined" color="primary" size="large">
            <Link to="/">Action 1</Link>
          </Button>
          <Button variant="outlined" color="primary" size="large">
            <Link to="/">Action 2</Link>
          </Button>
        </section>
      </Paper>
    </div>
  );
};

export default Landing;
