import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './NewMovie.scss';

const defaultInputs = [
  {
    name: 'title',
    value: '',
    placeholder: 'Title name',
    error: false,
    errorMessage: 'Please enter the title',
  },
  {
    name: 'imgUrl',
    value: '',
    placeholder: 'Url for image',
    error: false,
    errorMessage: 'Please enter url for image',
  },
  {
    name: 'imdbUrl',
    value: '',
    placeholder: 'Url for imdb',
    error: false,
    errorMessage: 'Please enter url for imdb',
  },
  {
    name: 'imdbId',
    value: '',
    placeholder: 'Id for imdb',
    error: false,
    errorMessage: 'Please enter Id for imdb',
  },
  {
    name: 'description',
    value: '',
    placeholder: 'Description',
  },
];

export class NewMovie extends Component {
  state = {
    inputs: defaultInputs,
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState((state) => {
      const newInputs = state.inputs.map((input) => {
        return input.name === name
          ? {
            ...input, value,
          }
          : input;
      });

      return {
        inputs: newInputs,
      };
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState((state) => {
      const newInputs = state.inputs.map((input) => {
        // eslint-disable-next-line max-len
        const regex = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

        if (input.value === ''
          || (input.name === 'imgUrl' && !input.value.match(regex))
          || (input.value.name === 'imdbUrl' && !input.match(regex))) {
          return {
            ...input, error: true,
          };
        }

        return input;
      });

      return {
        inputs: newInputs,
      };
    });

    const { inputs } = this.state;

    if (inputs.filter(input => input.name !== 'description'
      && input.value === '').length > 0) {
      return;
    }

    const newMovie = {
      title: this.findInput('title'),
      imgUrl: this.findInput('imgUrl'),
      imdbUrl: this.findInput('imdbUrl'),
      imdbId: this.findInput('imdbId'),
      description: this.findInput('description'),
    };

    this.props.addNewMovie(newMovie);

    this.setState({
      inputs: defaultInputs,
    });
  };

  findInput(name) {
    return this.inputs.find(input => input.name === name).value;
  }

  render() {
    const { inputs } = this.state;

    return (
      <form
        className="NewMovie"
        onSubmit={this.handleSubmit}
      >
        {inputs.map((input) => {
          return input.name === 'description'
            ? (
              <textarea
                key={input.name}
                type="text"
                name={input.name}
                placeholder={input.placeholder}
                value={input.description}
                onChange={this.handleChange}
              />
            ) : (
              <div key={input.name}>
                <input
                  className={classNames({
                    NewMovie__input: true,
                    'NewMovie__input--error': input.error,
                  })}
                  type="text"
                  name={input.name}
                  placeholder={input.placeholder}
                  value={input.value}
                  onChange={this.handleChange}
                />
                <p className={classNames({
                  error: true,
                  'error--displayed': input.error,
                })}
                >
                  Please enter the title
                </p>
              </div>
            );
        })}

        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addNewMovie: PropTypes.func.isRequired,
};
