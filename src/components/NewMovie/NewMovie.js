import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input } from '../Input/Input';

export class NewMovie extends Component {
  // eslint-disable-next-line max-len
  patternUrl = '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)\n?[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)\n((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)#?\n(?:[.!/\\\\\\w]*))?)$';

  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleBlur = (event) => {
    const { name } = event.target;

    this.setState(state => ({
      [name]: state[name].trim(),
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addMovie(this.state);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="title"
          value={title}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
        />
        <Input
          name="description"
          value={description}
          required={false}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
        />
        <Input
          name="imgUrl"
          pattern={this.patternUrl}
          value={imgUrl}
          handleChange={this.handleChange}
        />
        <Input
          name="imdbUrl"
          pattern={this.patternUrl}
          value={imdbUrl}
          handleChange={this.handleChange}
        />
        <Input
          name="imdbId"
          value={imdbId}
          pattern="tt\d{7}"
          title="Enter 7 digits"
          handleChange={this.handleChange}
          handleBlur={() => {
            this.setState(state => ({
              imdbId: `tt${state.imdbId}`,
            }));
          }}
        />
        <button type="submit" className="button is-link">
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
