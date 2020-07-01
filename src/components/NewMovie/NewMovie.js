import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Field } from '../Field/Field';
import { names, initialState, indexes, status, reg } from '../../api/constants';

const allValid = {
  ...indexes,
};

let valid = [...status];
const fields = [...names];
let disabled = true;

export class NewMovie extends Component {
  state = initialState;

  handleChange = (ev) => {
    ev.persist();

    return (this.setState(() => ({
      [ev.target.name]: ev.target.value,
    })));
  }

  handleSubmit = (ev) => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    valid = [...status];
    ev.preventDefault();
    this.props.addMovie({
      title, description, imgUrl, imdbUrl, imdbId,
    });
    this.setState(initialState);
    disabled = true;
  }

  validation = (name, value, option) => {
    if (typeof option === 'number') {
      if (value.length < option) {
        valid[allValid[name]] = false;
        this.setState(() => ({
          [`${name}Error`]: `Must contain at least ${option} characters`,
        }));
      } else {
        this.setState(() => ({ [`${name}Error`]: '' }));
        valid[allValid[name]] = true;
      }
    } else if (option === 'url') {
      if (!reg.test(value)) {
        valid[allValid[name]] = false;
        this.setState(() => ({ [`${name}Error`]: 'Enter the correct url' }));
      } else {
        this.setState(() => ({ [`${name}Error`]: '' }));
        valid[allValid[name]] = true;
      }
    }

    disabled = (!valid.every(el => el === true));
  }

  render() {
    return (
      <form onSubmit={ev => this.handleSubmit(ev)}>
        <fieldset className="inputs-block">
          <legend>Add a movie</legend>
          {
            fields.map(name => (
              <Field
                valid={valid[indexes[name]]}
                name={name}
                value={this.state[name]}
                err={this.state[`${name}Error`]}
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
