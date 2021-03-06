import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    focusOnInput: [],
  };

  changeInputField = (event) => {
    const { id, value } = event.target;

    this.setState({
      [id]: value,
    });
  }

  lossFocusFromTheInput = (event) => {
    const { value, id } = event.target;
    const { focusOnInput } = this.state;

    if (!value) {
      focusOnInput.push(id);
    } else {
      focusOnInput.splice(focusOnInput.indexOf(id), 1);
    }

    this.setState({ focusOnInput: [...focusOnInput] });
  }

  lengthCheckAllField() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    let disabled;

    if (!title.length
    || !description.length
    || !imgUrl.length
    || !imdbUrl.length
    || !imdbId.length) {
      disabled = true;
    } else {
      disabled = false;
    }

    return disabled;
  }

  clearField() {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  createNewMovie() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };
  }

  validateUrlAddress() {
    // eslint-disable-next-line max-len
    const linkReg = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const { imgUrl, imdbUrl } = this.state;
    const errorUrl = [];

    if (!imgUrl.match(linkReg) && imgUrl.length !== 0) {
      errorUrl.push('img');
    }

    if (!imdbUrl.match(linkReg) && imdbUrl.length !== 0) {
      errorUrl.push('imdb');
    }

    return errorUrl;
  }

  render() {
    const { onAdd } = this.props;
    const newMovie = this.createNewMovie();
    const lenghtCheck = this.lengthCheckAllField();
    const validateUrl = this.validateUrlAddress();
    const { focusOnInput } = this.state;

    return (
      <>
        <form>
          <label>
            <p>Title</p>
            <input
              id="title"
              type="text"
              value={this.state.title}
              onChange={e => this.changeInputField(e)}
              onBlur={e => this.lossFocusFromTheInput(e)}
            />
            {focusOnInput.includes('title') && (
              <div className="empty_field_error">
                Please enter text!
              </div>
            )}
          </label>

          <label>
            <p>Description</p>
            <input
              id="description"
              type="text"
              value={this.state.description}
              onChange={e => this.changeInputField(e)}
              onBlur={e => this.lossFocusFromTheInput(e)}
            />
            {focusOnInput.includes('description') && (
              <div className="empty_field_error">
                Please enter text!
              </div>
            )}
          </label>

          <label>
            <p>imgUrl</p>
            <input
              id="imgUrl"
              type="text"
              value={this.state.imgUrl}
              onChange={e => this.changeInputField(e)}
              onBlur={e => this.lossFocusFromTheInput(e)}
            />
            {focusOnInput.includes('imgUrl') && (
              <div className="empty_field_error">
                Please enter text!
              </div>
            )}
            {validateUrl.includes('img') && (
              <div className="empty_field_error">
                Invalid URL address!
              </div>
            )}
          </label>

          <label>
            <p>imdbUrl</p>
            <input
              id="imdbUrl"
              type="text"
              value={this.state.imdbUrl}
              onChange={e => this.changeInputField(e)}
              onBlur={e => this.lossFocusFromTheInput(e)}
            />
            {focusOnInput.includes('imdbUrl') && (
              <div className="empty_field_error">
                Please enter text!
              </div>
            )}
            {validateUrl.includes('imdb') && (
              <div className="empty_field_error">
                Invalid URL address!
              </div>
            )}
          </label>

          <label>
            <p>imdbId</p>
            <input
              id="imdbId"
              type="text"
              value={this.state.imdbId}
              onChange={e => this.changeInputField(e)}
              onBlur={e => this.lossFocusFromTheInput(e)}
            />
            {focusOnInput.includes('imdbId') && (
              <div className="empty_field_error">
                Please enter text!
              </div>
            )}
          </label>
        </form>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onAdd(newMovie);
            this.clearField();
          }}
          disabled={lenghtCheck}
        >
          Add new movie
        </button>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
