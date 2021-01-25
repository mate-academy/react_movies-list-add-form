import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imgUrlError: false,
    imdbUrlError: false,
  };

  submitForm = (event) => {
    event.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(movie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      imgUrlError: false,
      imdbUrlError: false,
    });
  }

  fieldsChange = (event) => {
    const { value, name } = event.target;

    // eslint-disable-next-line max-len
    const validate = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      if (!validate.test(value)) {
        this.setState({ [name]: value });
        (name === 'imgUrl')
          ? this.setState({ imgUrlError: true })
          : this.setState({ imdbUrlError: true });
      } else {
        this.setState({ [name]: value });
        (name === 'imgUrl')
          ? this.setState({ imgUrlError: false })
          : this.setState({ imdbUrlError: false });
      }
    } else {
      this.setState({ [name]: value });
    }
  }

  render() {
    const { imdbUrlError, imgUrlError } = this.state;

    return (
      <form
        onSubmit={this.submitForm}
      >
        <label htmlFor="title-text" className="label">
          Title
        </label>
        <input
          type="text"
          id="title-text"
          name="title"
          className="fild"
          placeholder="Title"
          required="true"
          value={this.state.title}
          onChange={this.fieldsChange}
        />
        <label htmlFor="descript" className="label">
          Description
        </label>
        <textarea
          name="description"
          id="descript"
          className="fild"
          placeholder="Describe the movie"
          value={this.state.description}
          onChange={this.fieldsChange}
        />
        {!imgUrlError
          ? (
            <label htmlFor="img-url" className="label">
              ImgUrl
            </label>
          ) : (
            <label htmlFor="img-url" className="label-err">
              Invalid URL
            </label>
          )
        }
        <input
          type="text"
          id="img-url"
          name="imgUrl"
          className={classNames(`fild`, {
            fildErr: imgUrlError === true,
          })}
          placeholder="ImgUrl"
          required="true"
          value={this.state.imgUrl}
          onChange={this.fieldsChange}
        />
        {!imdbUrlError
          ? (
            <label htmlFor="imdb-url" className="label">
              ImdbUrl
            </label>
          ) : (
            <label htmlFor="imdb-url" className="label-err">
              Invalid URL
            </label>
          )
        }
        <input
          type="text"
          id="imdb-url"
          name="imdbUrl"
          className={classNames(`fild`, {
            fildErr: imdbUrlError === true,
          })}
          placeholder="ImdbUrl"
          required="true"
          value={this.state.imdbUrl}
          onChange={this.fieldsChange}
        />
        <label htmlFor="imdb-id" className="label">
          ImdbId
        </label>
        <input
          type="text"
          id="imdb-id"
          name="imdbId"
          className="fild"
          placeholder="ImdbId"
          required="true"
          value={this.state.imdbId}
          onChange={this.fieldsChange}
        />
        <div>
          <button
            disabled={imgUrlError || imdbUrlError}
            type="submit"
            className="button"
          >
            Add movie
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
