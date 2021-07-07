import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';
import './NewMovie.scss';
import { validateNewMovie } from './validateNewMovie';
import { initialValues, initialErrors } from './constants';
import { movieConfig } from '../constants';

export class NewMovie extends Component {
  state = {
    values: initialValues,
    errors: initialErrors,
  };

  changeHandler = ({ target }) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [target.name]: target.value,
      },
    }));
  }

  onAdd = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;

    this.setState((prevState) => {
      const {
        errors,
        hasErrors,
      } = validateNewMovie(prevState.values);

      if (hasErrors) {
        return {
          errors,
        };
      }

      onSubmit(prevState.values);

      return {
        errors,
        values: initialValues,
      };
    });
  };

  render() {
    const { values, errors } = this.state;

    return (
      <Form onSubmit={this.onAdd} name="newMovie">
        {movieConfig.map((name) => {
          if (name === 'description') {
            return (
              <div
                key={name}
                className={`field ${errors[name] ? 'error' : ''}`}
              >
                <Form.TextArea
                  label={name}
                  placeholder={`${name}...`}
                  onChange={this.changeHandler}
                  name={name}
                  value={values[name]}
                />
              </div>
            );
          }

          return (
            <div key={name} className={`field ${errors[name] ? 'error' : ''}`}>
              {errors[name] && (
                <Label
                  basic
                  color="red"
                  pointing="below"
                  size="small"
                >
                  {errors[name]}
                </Label>
              )}
              <Form.Input
                label={name}
                type="text"
                placeholder={`${name}...`}
                onChange={this.changeHandler}
                name={name}
                value={values[name]}
              />
            </div>
          );
        })}
        <Form.Button primary>Add</Form.Button>
      </Form>
    );
  }
}

NewMovie.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
