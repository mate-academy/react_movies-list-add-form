import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleSubmit = () => {
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
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.handleSubmit();
      }}
      >
        {Object.keys(this.state).map(stateField => (
          <div key={stateField}>
            <label>
              {stateField}
              <input
                value={this.state[stateField]}
                name={stateField}
                placeholder={stateField}
                onChange={this.handleChange}
              />
            </label>
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
}.isRequired;
