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

  handleChange = (changeEvent) => {
    const inputName = changeEvent.target.name;

    this.setState({
      [inputName]: changeEvent.target.value,
    });
  }

  render() {
    const { onAdd } = this.props;

    return (
      <form
        className="film-adder"
        onSubmit={(event) => {
          event.preventDefault();
          onAdd({ ...this.state });
          this.clearForm();
        }
      }
      >
        {inputs.map((inputText, index) => {
          const keyIndex = index;

          return (
            <div key={inputText + keyIndex} className="form-container">
              <label htmlFor={inputText}>
                {inputText}
                :
                <br />
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
          );
        })}
        <button type="submit" className="sub">add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
