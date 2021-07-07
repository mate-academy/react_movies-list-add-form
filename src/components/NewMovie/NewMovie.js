import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '../TextField/TextField';
import './NewMovie.scss';

const fields = {
  title: {
    name: 'title',
    label: 'Title',
    placeholder: 'Enter title',
  },

  description: {
    name: 'description',
    label: 'Description',
    placeholder: 'Write description',
  },

  imgUrl: {
    name: 'imgUrl',
    label: 'Poster',
    placeholder: 'Paste poster url',
  },

  imdbUrl: {
    name: 'imdbUrl',
    label: 'Imdb Link',
    placeholder: 'Paste Imdb url',
  },

  imdbId: {
    name: 'imdbId',
    label: 'Imdb Id',
    placeholder: 'Paste movie Id',
  },
};

const fieldsConfig = Object.values(fields);

const initialValues = fieldsConfig.reduce(
  (acc, { name }) => ({
    ...acc,
    [name]: '',
  }),
  {},
);

const initialErrors = fieldsConfig.reduce(
  (acc, { name }) => ({
    ...acc,
    [name]: null,
  }),
  {},
);

const initialTouched = fieldsConfig.reduce(
  (acc, { name }) => ({
    ...acc,
    [name]: false,
  }),
  {},
);

export class NewMovie extends Component {
  state = {
    values: initialValues,
    errors: initialErrors,
    touched: initialTouched,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;

    this.setState({
      values: initialValues,
    });

    addMovie(this.state.values);
  };

  handleChange = name => (value) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  handleBlur = name => (value) => {
    const validator = fields[name].validate;

    this.setState(prevState => ({
      touched: {
        ...prevState.touched,
        [name]: true,
      },
      errors: {
        ...prevState.errors,
        [name]: validator ? validator(name, value) : null,
      },
    }));
  };

  render() {
    const { values, errors, touched } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form">
        {fieldsConfig.map(({ name, label, placeholder }) => (
          <TextField
            key={name}
            name={name}
            label={label}
            placeholder={placeholder}
            value={values[name]}
            onChange={this.handleChange(name)}
            onBlur={this.handleBlur(name)}
            error={errors[name]}
            touched={touched[name]}
          />
        ))}
        <button type="submit" className="form__btn">
          Add Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
