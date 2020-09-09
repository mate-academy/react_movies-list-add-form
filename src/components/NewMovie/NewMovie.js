import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Field } from '../Field/Field';
import { names, initialState, indexes, status, reg } from '../../api/constants';

const areFieldsValid = {
  ...indexes,
};

let isValid = [...status];
const fields = [...names];
let disabled = true;

export class NewMovie extends Component {
  state = initialState;

  handleChange = (event) => {
    const { value, name } = event.target;

    return (this.setState(() => ({
      [name]: value,
      [`${name}Error`]: '',
    })));
  }

  handleSubmit = (event) => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    isValid = [...status];
    event.preventDefault();
    this.props.addMovie({
      title, description, imgUrl, imdbUrl, imdbId,
    });
    this.setState(initialState);
    disabled = true;
  }

  validation = (event, option) => {
    const { value, name } = event.target;

    if (typeof option === 'number') {
      if (value.length < option) {
        isValid[areFieldsValid[name]] = false;
        this.setState(() => ({
          [`${name}Error`]: `Must contain at least ${option} characters`,
        }));
      } else {
        this.setState(() => ({ [`${name}Error`]: '' }));
        isValid[areFieldsValid[name]] = true;
      }
    } else if (option === 'url') {
      if (!reg.test(value)) {
        isValid[areFieldsValid[name]] = false;
        this.setState(() => ({ [`${name}Error`]: 'Enter the correct url' }));
      } else {
        this.setState(() => ({ [`${name}Error`]: '' }));
        isValid[areFieldsValid[name]] = true;
      }
    }

    disabled = (!isValid.every(element => element === true));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset className="inputs-block">
          <legend>Add a movie</legend>
          {
            fields.map(name => (
              <Field
                isValid={isValid[indexes[name]]}
                name={name}
                value={this.state[name]}
                error={this.state[`${name}Error`]}
                handleChange={this.handleChange}
                validation={this.validation}
              />
            ))
          }
        </fieldset>
        <input
          disabled={disabled}
          type="submit"
          name="but"
          value="Submit"
        />
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
