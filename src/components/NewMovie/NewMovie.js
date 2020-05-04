import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    isValidTitle: true,
    description: '',
    isValidDescription: true,
    imgUrl: '',
    isValidImgUrl: true,
    imdbUrl: '',
    isValidImdbUrl: true,
    imdbId: '',
    isValidImdbId: true,

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
        return value.trim() !== '';
      case 'imgUrl':
      case 'imdbUrl':
        // eslint-disable-next-line
        return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(value);
      default: return true;
    }
  }

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`isValid${name[0].toUpperCase() + name.slice(1)}`]:
        this.inputValidation(name, value),

    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.title.trim() === '') {
      this.setState({
        isValidTitle: false,
      });

      return;
    }

    if (this.state.description.trim() === '') {
      this.setState({
        isValidDescription: false,
      });

      return;
    }

    if (this.state.imgUrl.trim() === '') {
      this.setState({
        isValidImgUrl: false,
      });

      return;
    }

    if (this.state.imdbUrl.trim() === '') {
      this.setState({
        isValidImdbUrl: false,
      });

      return;
    }

    if (this.state.imdbId.trim() === '') {
      this.setState({
        isValidImdbId: false,
      });

      return;
    }

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    this.props.addMovie({
      title, description, imgUrl, imdbUrl, imdbId,
    });

    this.setState({
      title: '',
      isValidTitle: true,
      description: '',
      isValidDescription: true,
      imgUrl: '',
      isValidImgUrl: true,
      imdbUrl: '',
      isValidImdbUrl: true,
      imdbId: '',
      isValidImdbId: true,
    });
  }

  render() {
    return (
      <form className="new-movie" onSubmit={this.handleFormSubmit}>
        <fieldset>
          {this.fields.map((field) => {
            const fieldCapitalised = field[0].toUpperCase() + field.slice(1);

            return (
              <Fragment key={field}>
                <label htmlFor={field}>
                  {`${fieldCapitalised}  `}
                  <br />
                  <input
                    className={`new-movie__field${
                      (this.state[`isValid${fieldCapitalised}`])
                        ? ''
                        : ' new-movie__field--non-valid'
                    }`}
                    onBlur={this.handleFieldChange}
                    key={field}
                    type="text"
                    name={field}
                    value={this.state[field]}
                    onChange={this.handleFieldChange}
                  />
                </label>
                <p
                  className={
                    `new-movie__error${
                      (this.state[`isValid${fieldCapitalised}`])
                        ? ''
                        : ' new-movie__error--visible'
                    }`}
                >
                  Not valid data
                </p>
              </Fragment>
            );
          })}

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
