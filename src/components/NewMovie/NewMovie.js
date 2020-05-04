import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title_InputValue: '',
    isValid_title_InputValue: true,
    description_InputValue: '',
    isValid_description_InputValue: true,
    imgUrl_InputValue: '',
    isValid_imgUrl_InputValue: true,
    imdbUrl_InputValue: '',
    isValid_imdbUrl_InputValue: true,
    imdbId_InputValue: '',
    isValid_imdbId_InputValue: true,

  };

  fields = [
    'title',
    'description',
    'imgUrl',
    'imdbUrl',
    'imdbId',
  ]

  inputValidation = (name, value) => {
    switch (name) {
      case 'imdbId':
      case 'title':
      case 'description':
        return value !== '';
      case 'imgUrl':
      case 'imdbUrl':
        // eslint-disable-next-line
          return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(value);
      default: return true;
    }
  }

  handleFieldChange = (event) => {
    this.setState({
      [`${event.target.name}_InputValue`]:
        event.target.value,
      [`isValid_${event.target.name}_InputValue`]:
        this.inputValidation(event.target.name, event.target.value),

    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.title_InputValue === '') {
      this.setState({
        isValid_title_InputValue: false,
      });

      return;
    }

    if (this.state.description_InputValue === '') {
      this.setState({
        isValid_description_InputValue: false,
      });

      return;
    }

    if (this.state.imgUrl_InputValue === '') {
      this.setState({
        isValid_imgUrl_InputValue: false,
      });

      return;
    }

    if (this.state.imdbUrl_InputValue === '') {
      this.setState({
        isValid_imdbUrl_InputValue: false,
      });

      return;
    }

    if (this.state.imdbId_InputValue === '') {
      this.setState({
        isValid_imdbId_InputValue: false,
      });

      return;
    }

    const movie = {
      title: this.state.title_InputValue,
      description: this.state.description_InputValue,
      imgUrl: this.state.imgUrl_InputValue,
      imdbUrl: this.state.imdbUrl_InputValue,
      imdbId: this.state.imdbId_InputValue,
    };

    this.props.addMovie(movie);

    this.setState({
      title_InputValue: '',
      isValid_title_InputValue: true,
      description_InputValue: '',
      isValid_description_InputValue: true,
      imgUrl_InputValue: '',
      isValid_imgUrl_InputValue: true,
      imdbUrl_InputValue: '',
      isValid_imdbUrl_InputValue: true,
      imdbId_InputValue: '',
      isValid_imdbId_InputValue: true,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <fieldset>
          {this.fields.map(field => (
            <Fragment key={field}>
              <label htmlFor={field}>
                {`${field[0].toUpperCase() + field.slice(1)}  `}
                <br />
                <input
                  onFocus={this.handleFieldChange}
                  style={{
                    outline: 'none',
                    border: `1px solid ${(
                      this.state[`isValid_${field}_InputValue`])
                      ? 'black' : 'red'}`,
                  }}
                  key={field}
                  type="text"
                  name={field}
                  value={this.state[`${field}_InputValue`]}
                  onChange={this.handleFieldChange}
                />
              </label>
              <p
                style={{
                  color: 'red',
                  fontSize: '10px',
                  visibility: `${(this.state[`isValid_${field}_InputValue`])
                    ? 'hidden' : 'visible'}`,
                }}
              >
                Not valid data
              </p>
            </Fragment>
          ))}

        </fieldset>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

export default NewMovie;
