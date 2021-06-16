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
    this.checkForValidData(name, value)
  }

  checkForValidData(name, value) {

    if (!value
      || (['imdbUrl', 'imgUrl'].includes(name) && !value.match(regEx))
    ) {
      this.setState(state => ({
        errors: [...state.errors, name],
      }));

      return false;
    }

    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    this.props.addMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId
    });

    this.resetState();
  }

  setErrorMessage = (failedInput) => {
    return ['imdbUrl', 'imgUrl'].includes(failedInput) && this.state[failedInput]
      ? `${failedInput} is not valid `
      : `${failedInput} is required`;
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

    const { errors } = this.state;

    
    return (
      <form 
        className="form" 
        onSubmit={this.handleSubmit} 
        autoComplete="off"
      >
        {
          Object.keys(this.state).map((stateField) => {
            return stateField !== 'errors'
              && (<div className="wrapper" key={stateField}>
                <TextField
                  id={stateField}
                  label={
                    stateField[0].toUpperCase() + stateField.slice(1)
                  }
                  fullWidth
                  name={stateField}
                  value={this.state[`${stateField}`]}
                  variant="outlined"
                  error={errors.includes(stateField)}

                  helperText={
                    errors.includes(stateField) && this.setErrorMessage(stateField)
                  }
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </div>
              );
          })
        }
        <div className="wrapper">
          <Button
            type="submit"
            variant="outlined"
            error={errors.length}
            disabled={!(Object.values(this.state).every(value => value) && !errors.length)}
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
