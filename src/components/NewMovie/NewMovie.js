import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';
import { FormInput } from '../FormInput';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    submitDisabled: true,
  };

  formFields = [
    'title',
    'description',
    'imgUrl',
    'imdbUrl',
    'imdbId',
  ];

  onInputChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      [name]: value,
      submitDisabled: !(
        state.title !== '' && state.imgUrl !== '' && state.imdbUrl !== ''
        && state.imdbId !== ''
      ),
    }));
  }

  clearForm() {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      submitDisabled: true,
    });
  }

  render() {
    const { onAdd } = this.props;
    const {
      title, description, imgUrl, imdbUrl, imdbId, submitDisabled,
    } = this.state;

    return (
      <form
        name="newMovie"
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(title, description, imgUrl, imdbUrl, imdbId);
          this.clearForm();
        }}
      >
        {
          this.formFields.map((field) => {
            return (
              <FormInput
                inputName={field}
                value={this.state[field]}
                onChange={this.onInputChange}
              />
            );
          })
        }
        <button
          type="submit"
          className="form__button"
          disabled={submitDisabled}
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
