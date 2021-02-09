import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

const initState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component {
  state = initState;

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const newMovie = this.creatNewMovie();

    this.props.onAdd(newMovie);
    this.clearForm();
  }

  creatNewMovie = () => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      error: {
        title: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
      disabled: false,
    };

    return newMovie;
  }

  clearForm = () => {
    this.setState(initState);
  }

  render() {
    const newMovie = Object.keys(this.state).slice(0, 5);

    return (
      <form
        className="form"
        onSubmit={this.onSubmit}
      >
        {newMovie.map(item => (
          <div key={item}>
            <input
              key={item}
              className="input"
              name={item}
              type="text"
              value={this.state[item]}
              placeholder={`Enter ${item}`}
              onChange={(event) => {
                this.handleChange(event);
              }}
            />
          </div>
        ))}
        <button type="submit">Add</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
