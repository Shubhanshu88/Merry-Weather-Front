import React from 'react';
import Icon from '@material-ui/core/Icon';
import iconVerify from '../helpers/iconVerify';

const CustomIcon = (props) => {
  return (
    <Icon component="img" {...props} src={`${process.env.PUBLIC_URL}/icons/${iconVerify(props.icon)}.png`} alt="weather icon"/>
  );
};

export default CustomIcon;