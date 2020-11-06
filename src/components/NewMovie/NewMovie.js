import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input';
import './NewMovie.scss';

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component {
  state = { ...initialState };

  handleChange = (event) => {
    const { id, value } = event.target;

    this.setState({
      [id]: value,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const newMovie = this.state;

    this.props.onAdd(newMovie);
    this.formClear();
  }

  formClear() {
    this.setState({ ...initialState });
  }

  render() {
    return (
      <form
        name="newMovie"
        onSubmit={this.onSubmit}
      >
        {
          Object.entries(this.state).map(([key, value]) => (
            <Input
              name={key}
              value={value}
              handleChange={this.handleChange}
              key={key}
            />
          ))
        }
        <button type="submit" className="submitButton">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
