import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { FormField } from '../FormField';
import { MessageWarning } from './Messages';
import { required, url } from '../../helpers/validators';
import './NewMovie.scss';

const fieldConfigs = [
  {
    name: 'title',
    label: 'Title',
    placeholder: 'Enter a title',
    validators: [required],
  },
  {
    name: 'description',
    label: 'Description',
    placeholder: 'Enter a description',
  },
  {
    name: 'imgUrl',
    label: 'Image URL',
    placeholder: 'Paste an image url',
    validators: [required, url],
  },
  {
    name: 'imdbUrl',
    label: 'IMDB URL',
    placeholder: 'Paste an IMDB url',
    validators: [required, url],
  },
  {
    name: 'imdbId',
    label: 'IMDB id',
    placeholder: 'Enter an IMDB id',
    validators: [required],
  },
];

const preparedState = fieldConfigs.reduce(
  // eslint-disable-next-line no-return-assign,no-param-reassign,no-sequences
  (obj, { name }) => (obj[name] = '', obj), {},
);

Object.freeze(preparedState);

export class NewMovie extends Component {
  state = {
    values: preparedState,
    errors: preparedState,
    isFetching: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value,
      },
      errors: {
        ...state.errors,
        [name]: '',
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState((state) => {
      const newErrors = { ...preparedState };

      fieldConfigs.forEach(({ name, label }) => {
        newErrors[name] = this.validateField(name, state.values[name], label);
      });

      if (!this.isValid(newErrors)) {
        return { errors: newErrors };
      }

      this.props.onAdd(state.values);

      return {
        ...state,
        values: preparedState,
        errors: preparedState,
      };
    });
  };

  handleBlur = ({ target: { name, id } }) => {
    this.setState(state => ({
      errors: {
        ...state.errors,
        [name]: this.validateField(name, state.values[name], id),
      },
    }));
  };

  validateField = (name, value, label) => {
    const { validators = [] } = fieldConfigs.find(cnf => cnf.name === name);

    return validators
      .map(validator => validator(label, value))
      .filter(Boolean)
      .join(', ');
  };

  isValid = array => !Object.values(array).some(Boolean);

  render() {
    const { values, errors, isFetching } = this.state;
    const isValid = this.isValid(errors);

    return (
      <Form
        className="add-movie"
        warning
        success={isValid && isFetching}
        onSubmit={this.handleSubmit}
      >
        {fieldConfigs.map(({ name, label, placeholder }) => (
          <FormField
            key={name}
            id={label}
            name={name}
            label={label}
            placeholder={placeholder}
            value={values[name]}
            error={errors[name]}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        ))}
        <MessageWarning
          isValid={isValid}
          isFetching={isFetching}
        />
        <Button className="add-movie__btn" color="yellow">Add Movie</Button>
      </Form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
