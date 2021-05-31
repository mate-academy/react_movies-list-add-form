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
    firstTouch: false,
  },
  {
    name: 'imgUrl',
    value: '',
    placeholder: 'Url for image',
    error: false,
    errorMessage: 'Please enter url for image',
    firstTouch: false,
  },
  {
    name: 'imdbUrl',
    value: '',
    placeholder: 'Url for imdb',
    error: false,
    errorMessage: 'Please enter url for imdb',
    firstTouch: false,
  },
  {
    name: 'imdbId',
    value: '',
    placeholder: 'Id for imdb',
    error: false,
    errorMessage: 'Please enter Id for imdb',
    firstTouch: false,
  },
  {
    name: 'description',
    value: '',
    placeholder: 'Description',
  },
];

const findEmptyStr = (input) => {
  return input.name !== 'description' && input.value === '';
};

const findInputValue = (inputs, name) => {
  return inputs.find(input => input.name === name).value;
};

export class NewMovie extends Component {
  state = {
    inputs: defaultInputs,
    disabledButton: true,
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState((state) => {
      const newInputs = state.inputs.map((input) => {
        return input.name === name
          ? {
            ...input,
            value,
            error: false,
          }
          : {
            ...input,
            error: false,
          };
      });

      return {
        inputs: newInputs,
      };
    });

    this.setState({ disabledButton: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState((state) => {
      // eslint-disable-next-line max-len
      const regex = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);
      let disabledButtonValue = false;

      const newInputs = state.inputs.map((input) => {
        if (input.value === ''
          || (input.name === 'imgUrl' && !input.value.match(regex))
          || (input.value.name === 'imdbUrl' && !input.match(regex))) {
          disabledButtonValue = true;

          return {
            ...input, error: true,
          };
        }

        return input;
      });

      return {
        inputs: newInputs,
        disabledButton: disabledButtonValue,
      };
    });

    const { inputs } = this.state;

    if (inputs.filter(findEmptyStr).length > 0) {
      return;
    }

    const newMovie = {
      title: findInputValue(inputs, 'title'),
      imgUrl: findInputValue(inputs, 'imgUrl'),
      imdbUrl: findInputValue(inputs, 'imdbUrl'),
      imdbId: findInputValue(inputs, 'imdbId'),
      description: findInputValue(inputs, 'description'),
    };

    this.props.addNewMovie(newMovie);

    this.setState({
      inputs: defaultInputs,
    });
  };

  render() {
    const { inputs, disabledButton } = this.state;

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
          disabled={disabledButton}
          className="NewMovie__button"
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
