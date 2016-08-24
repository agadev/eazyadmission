import React from 'react';
import Form from './Form';
import Routes from '../';


const onFormPress = (navigator) => {
  return navigator.push(Routes.getFormRoute());
};

const FormContainer = (props) => {
  return (
    <Form
      onFormPress={() => onFormPress(props.navigator)}
    />
  );
};

FormContainer.propTypes = {
  navigator: React.PropTypes.object,
};

export default FormContainer;
