import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import style from './style.scss';

const Navbar = (props) => {
  const [tab, setTab] = useState(0);
  const handleChange = (event, newValue) => setTab(newValue);
  const { history } = props;
  return (
    <AppBar position="static" className={style.wrapper}>
      <Tabs variant="fullWidth" value={tab} onChange={handleChange}>
        <Tab label="1" onClick={() => history.push('/')} />
        <Tab label="2" onClick={() => history.push('/')} />
      </Tabs>
    </AppBar>
  );
};

export default Navbar;
