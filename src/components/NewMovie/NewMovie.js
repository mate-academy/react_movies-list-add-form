import React from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends React.Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imgUrlClass: 'notProblem',
    imdbUrlClass: 'notProblem',
    visibleErrorImg: true,
    visibleErrorImdb: true,
  };

  validateUrl = (url) => {
    // eslint-disable-next-line
    const reg = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return reg.test(url);
  }

  validationImgUrl = (value) => {
    if (!this.validateUrl(value)) {
      this.setState({
        imgUrlClass: 'problem',
        visibleErrorImg: false,
      });
    } else {
      this.setState({
        imgUrlClass: 'notProblem',
        visibleErrorImg: true,
      });
    }
  }

  validationImdbUrl = (value) => {
    if (!this.validateUrl(value)) {
      this.setState({
        imdbUrlClass: 'problem',
        visibleErrorImdb: false,
      });
    } else {
      this.setState({
        imdbUrlClass: 'notProblem',
        visibleErrorImdb: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { id, value } = target;

    if (id === 'imgUrl') {
      this.validationImgUrl(target.value);
    }

    if (id === 'imdbUrl') {
      this.validationImdbUrl(target.value);
    }

    this.setState({ [id]: value });
  }

  handleSubmit = (e) => {
    const { submit } = this.props;

    e.preventDefault();
    submit(this.state);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      disabledButton: '',
    });
  };

  render() {
    const { title, description,
      imgUrl, imdbUrl, imdbId,
      imgUrlClass, imdbUrlClass,
      visibleErrorImg, visibleErrorImdb } = this.state;

    return (
      <>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={description}
            onChange={this.handleChange}
          />
          <label htmlFor="imgUrl">
            ImgUrl
          </label>
          <input
            type="text"
            id="imgUrl"
            className={imgUrlClass}
            placeholder="ImgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />
          <div
            className="alert alert-danger"
            role="alert"
            hidden={visibleErrorImg}
          >
            ^^^Error. Check it ^^^
          </div>
          <label htmlFor="imdbUrl">
            ImdbUrl
          </label>
          <input
            type="text"
            id="imdbUrl"
            className={imdbUrlClass}
            placeholder="ImdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />
          <div
            className="alert alert-danger"
            role="alert"
            hidden={visibleErrorImdb}
          >
            ^^^Error. Check it ^^^
          </div>
          <label htmlFor="imdbId">
            ImdbId
          </label>
          <input
            type="text"
            id="imdbId"
            placeholder="ImdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
          <input
            type="submit"
            value="Submit"
            disabled={((imgUrlClass === 'notProblem'
            && imdbUrlClass === 'notProblem')
              ? ''
              : 'disabled'
            )}
          />
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  submit: PropTypes.func.isRequired,
};
