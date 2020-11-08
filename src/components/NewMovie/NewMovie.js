import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component {
  state = { ...initialState };

  onInputChange = (event) => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  clearForm() {
    this.setState({ ...initialState });
  }

  render() {
    const { onAdd } = this.props;
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    return (
      <form
        name="newMovie"
        className="field"
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(title, description, imgUrl, imdbUrl, imdbId);
          this.clearForm();
        }}
      >
        {Object.entries(this.state).map(([name, value]) => (
          <Input
            name={name}
            value={value}
            onInputChange={this.onInputChange}
          />
        ))}
        <button
          type="submit"
          className="button is-dark is-fullwidth"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
