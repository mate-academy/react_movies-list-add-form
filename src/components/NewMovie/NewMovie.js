import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';

const initialFields = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

// eslint-disable-next-line max-len
const regexp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    fields: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errors: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
    disabled: true,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addMovie({ ...this.state.fields });

    this.setState({
      fields: initialFields,
      disabled: true,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [name]: value,
      },
    }));
  };

  onBlur = (event) => {
    const { name, value } = event.target;
    const { fields, errors } = this.state;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [name]: !regexp.test(value),
        },
      }));
    } else if (name !== 'description') {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [name]: value === '',
        },
      }));
    }

    const fieldsWithoutDescription = { ...fields };

    delete fieldsWithoutDescription.description;

    this.setState({
      disabled:
        Object.values(fieldsWithoutDescription).some(field => field === '')
        || Object.values(errors).some(error => error === true),
    });
  };

  render() {
    const {
      fields,
      errors,
    } = this.state;

    return (
      <div>
        <div>Add new movie</div>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          {Object.keys(fields).map(field => (
            <Input
              key={field}
              name={field}
              value={fields[field]}
              error={errors[field]}
              handleChange={this.handleChange}
              onBlur={this.onBlur}
            />
          ))}

          <button
            className="button"
            type="submit"
            disabled={this.state.disabled}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
