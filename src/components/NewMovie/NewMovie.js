import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    checkImgUrl: false,
    checkImdbUrl: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    // eslint-disable-next-line
    const validUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const check = validUrl.test(imgUrl) && validUrl.test(imdbUrl);

    if (check) {
      this.props.addMovie(title, description, imgUrl, imdbUrl, imdbId);
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }

    if (title && description && imgUrl && imdbUrl && imdbId) {
      if (check) {
        this.setState({
          checkImgUrl: true,
          checkImdbUrl: true,
        });
      }
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      checkImgUrl: checkImg,
      checkImdbUrl: checkImdb,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <p className="is-size-4">Add a new film</p>

        <div>
          <input
            value={title}
            onChange={this.handleChange}
            type="text"
            name="title"
            placeholder="title"
          />

          {title.length > 0 && <span className="green-text">✓</span>}
        </div>

        <div>
          <input
            value={description}
            onChange={this.handleChange}
            type="text"
            name="description"
            placeholder="description"
          />

          {description.length > 0 && <span className="green-text">✓</span>}
        </div>

        <div>
          <input
            value={imgUrl}
            onChange={this.handleChange}
            type="text"
            name="imgUrl"
            placeholder="imgUrl"
          />

          {checkImg && imgUrl.length > 0
            ? <span className="green-text">✓</span>
            : ''}
        </div>

        <div>
          <input
            value={imdbUrl}
            onChange={this.handleChange}
            type="text"
            name="imdbUrl"
            placeholder="imdbUrl"
          />

          {checkImdb && imdbUrl.length > 0
            ? <span className="green-text">✓</span>
            : ''}
        </div>

        <div>
          <input
            value={imdbId}
            onChange={this.handleChange}
            type="text"
            name="imdbId"
            placeholder="imdbId"
          />

          {imdbId.length > 0 && <span className="green-text">✓</span>}
        </div>

        <button type="submit">add</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
