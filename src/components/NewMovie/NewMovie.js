import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { onAdd } = this.props;

    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { onAdd } = this.props;
    const newMovieKeys = Object.keys(this.state).slice(0, 5);

    return (
      <form
        className="ui-form"
        onSubmit={this.handleSubmit}
      >
        <h3>Add new movie</h3>
        {newMovieKeys.map(keyName => (
          <div key={keyName} className="form-row">
            <label htmlFor={keyName}>{keyName}</label>
            <input
              key={keyName}
              type="text"
              name={keyName}
              id={keyName}
              value={this.state[keyName]}
              required
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>
        ))}
        <input
          type="submit"
          value="Add"
          onChange={onAdd}
        />
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
