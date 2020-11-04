import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export const Input = ({ name, value, changeHandler }) => (
  <Form.Group>
    <Form.Label>{name}</Form.Label>
    <Form.Control
    name={name}
    type="text"
    placeholder={name}
    value={value}
    onChange={changeHandler}
    required
    />
  </Form.Group>
)