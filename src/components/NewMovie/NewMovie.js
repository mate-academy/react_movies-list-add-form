import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

const inputs = ['title', 'description', 'imgUrl', 'imdbUrl', 'imdbId'];

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    this.props.onAdd({ ...this.state });
    this.clearForm();
  }

  handleChange = (changeEvent) => {
    const { name, value } = changeEvent.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form
        className="film-adder"
        onSubmit={this.handleSubmit}
      >
        {inputs.map(inputText => (
          <div key={inputText} className="form-container">
            <label htmlFor={inputText}>
              <div>
                {`${inputText}:`}
              </div>
              <input
                id={inputText}
                name={inputText}
                type="text"
                value={this.state[inputText]}
                placeholder={inputText}
                onChange={this.handleChange}
              />
            </label>
          </div>
        ))}
        <button type="submit" className="sub">add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
