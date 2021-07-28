import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormElement } from '../FormElement/FormElement';

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  addNewMovie = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  getLabelInfo = (event) => {
    this.addNewMovie(event.target.name, event.target.value);
  }

  setDefaultState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { addMovie } = this.props;
    const { getLabelInfo, setDefaultState } = this;
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (pattern.test(imgUrl) && pattern.test(imdbUrl)) {
            const newMovie = {
              title,
              description,
              imgUrl,
              imdbUrl,
              imdbId,
            };

            addMovie(newMovie);

            setDefaultState();
          }
        }}
      >
        <div className="create-movie">
          <FormElement
            getLabelInfo={getLabelInfo}
            type="text"
            name="title"
            value={title}
          />
          <FormElement
            type="textarea"
            name="description"
            value={description}
            getLabelInfo={getLabelInfo}
          />
          <FormElement
            type="text"
            name="imgUrl"
            text={imgUrl}
            pattern={pattern}
            value={imgUrl}
            getLabelInfo={getLabelInfo}
          />
          <FormElement
            type="text"
            name="imdbUrl"
            text={imdbUrl}
            pattern={pattern}
            value={imdbUrl}
            getLabelInfo={getLabelInfo}
          />
          <FormElement
            type="text"
            name="imdbId"
            text={imdbId}
            value={imdbId}
            getLabelInfo={getLabelInfo}
          />
        </div>
        <button type="submit">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
