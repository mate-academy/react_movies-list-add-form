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
    imgUrlBorder: 'solid gray 1px',
    imdbUrlBorder: 'solid gray 1px',
    visibleError1: true,
    visibleError2: true,
  };

  validateUrl = (url) => {
    // eslint-disable-next-line
    const reg = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return reg.test(url);
  }

  validationImgUrl = (value) => {
    if (!this.validateUrl(value)) {
      this.setState({
        imgUrlBorder: 'solid red 1px',
        visibleError1: false,
      });
    } else {
      this.setState({
        imgUrlBorder: 'solid gray 1px',
        visibleError1: true,
      });
    }
  }

  validationImdbUrl = (value) => {
    if (!this.validateUrl(value)) {
      this.setState({
        imdbUrlBorder: 'solid red 1px',
        visibleError2: false,
      });
    } else {
      this.setState({
        imdbUrlBorder: 'solid gray 1px',
        visibleError2: true,
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
      imgUrlBorder, imdbUrlBorder, visibleError1, visibleError2 } = this.state;

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
            style={{ border: imgUrlBorder }}
            placeholder="ImgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />
          <div
            className="alert alert-danger"
            role="alert"
            hidden={visibleError1}
          >
            ^^^Error. Check it ^^^
          </div>
          <label htmlFor="imdbUrl">
            ImdbUrl
          </label>
          <input
            type="text"
            id="imdbUrl"
            style={{ border: imdbUrlBorder }}
            placeholder="ImdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />
          <div
            className="alert alert-danger"
            role="alert"
            hidden={visibleError2}
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
            disabled={((imgUrlBorder === 'solid gray 1px'
            && imdbUrlBorder === 'solid gray 1px')
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
