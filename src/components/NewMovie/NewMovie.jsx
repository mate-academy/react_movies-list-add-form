import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Button,
  TextField,
} from '@material-ui/core';

import './NewMovie.scss';

// eslint-disable-next-line
const regEx = /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/gum;

export class NewMovie extends Component {
  state = {
    errors: [],
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      errors: state.errors.filter(error => error !== name),
      [name]: !state[name] ? value.trim() : value,
    }));
  }

  handleBlur = (event) => {
    const { name, value } = event.target;

    if (!value) {
      this.setState(state => ({
        errors: [...state.errors, name],
      }));
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const stateFieldsArr = [
      ...Object.entries(this.state).filter(arr => arr[0] !== 'errors'),
    ];

    const filedFilds = stateFieldsArr.filter((field) => {
      const [name, value] = field;

      if (['imgUrl', 'imdbUrl'].includes(name)) {
        return !value.match(regEx);
      }

      return !value.trim();
    });

    if (filedFilds.length) {
      this.setState(({
        errors: [...filedFilds.map(field => field[0])],
      }));

      return;
    }

    const newMovieObject = Object.fromEntries(stateFieldsArr);

    this.props.addMovie(newMovieObject);
    this.resetState();
  }

  checkForError = (name) => {
    if (this.state.errors.includes(name)) {
      return ['imdbUrl', 'imgUrl'].includes(name) && this.state[name]
        ? `${name} is not valid `
        : `${name} is required`;
    }

    return false;
  }

  resetState() {
    this.setState({
      errors: [],
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit} autoComplete="off">

        {
          Object.keys(this.state).map((stateField) => {
            return stateField !== 'errors'
              && (
              <>
                <div className="wrapper">
                  <TextField
                    key={stateField}
                    id={stateField}
                    label={
                      stateField[0].toUpperCase() + stateField.slice(1)
                    }
                    fullWidth
                    name={stateField}
                    value={this.state[`${stateField}`]}
                    variant="outlined"
                    error={this.checkForError(stateField)}
                    helperText={
                      this.checkForError(stateField)
                    }
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                </div>
              </>
              );
          })
        }
        <div className="wrapper">
          <Button
            type="submit"
            variant="outlined"
            error={this.state.errors.length}
            disabled={this.state.errors.length}
            fullWidth
          >
            Add Movie
          </Button>
        </div>

      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
