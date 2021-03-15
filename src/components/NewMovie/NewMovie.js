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

  render() {
    const { addMovie } = this.props;

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        addMovie(this.state);
        this.setState({
          title: '',
          description: '',
          imgUrl: '',
          imdbUrl: '',
          imdbId: '',
        });
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

NewMovie.propTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imgUrl: PropTypes.string.isRequired,
  imdbUrl: PropTypes.string.isRequired,
  imdbId: PropTypes.string.isRequired,
}).isRequired;
