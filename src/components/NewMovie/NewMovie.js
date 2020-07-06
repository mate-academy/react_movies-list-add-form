import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';
import { TitleInput } from '../Inputs/TitleInput/TitleInput';
import { DescriptionInput } from '../Inputs/DescriptionInput/DescriptionInput';
import { ImageInput } from '../Inputs/ImageInput/ImageInput';
import { ImdbUrlInput } from '../Inputs/ImdbUrlInput/ImdbUrlInput';
import { ImdbIdInput } from '../Inputs/ImdbIdInput/ImdbIdInput';
import { MovieButton } from '../MovieButton/MovieButton';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {
      title: true,
      description: true,
      imgUrl: true,
      imdbUrl: true,
      imdbId: true,
    },
  };

  onChangeInput = (event, field) => {
    this.setState({
      [field]: event.trim(),
    });
  }

  handleValidate = (event, field) => {
    if (field === 'imgUrl' || field === 'imdbUrl') {
      // eslint-disable-next-line max-len
      const regex = (/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

      if (!regex.test(event)) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            [field]: true,
          },
        }));
      } else {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            [field]: false,
          },
        }));
      }
    } else if (event.length === 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [field]: true,
        },
      }));
    } else {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [field]: false,
        },
      }));
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.handleAddMovies(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      errors: {
        title: true,
        description: true,
        imgUrl: true,
        imdbUrl: true,
        imdbId: true,
      },
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errors,
    } = this.state;

    return (
      <form className="App__form" onSubmit={this.handleSubmit}>
        <h1>Add a movie</h1>
        <TitleInput
          onChangeInput={this.onChangeInput}
          handleValidate={this.handleValidate}
          title={title}
          error={errors.title}
        />
        <DescriptionInput
          onChangeInput={this.onChangeInput}
          handleValidate={this.handleValidate}
          description={description}
          error={errors.description}
        />
        <ImageInput
          onChangeInput={this.onChangeInput}
          handleValidate={this.handleValidate}
          imgUrl={imgUrl}
          error={errors.imgUrl}
        />
        <ImdbUrlInput
          onChangeInput={this.onChangeInput}
          handleValidate={this.handleValidate}
          imdbUrl={imdbUrl}
          error={errors.imdbUrl}
        />
        <ImdbIdInput
          onChangeInput={this.onChangeInput}
          handleValidate={this.handleValidate}
          imdbId={imdbId}
          error={errors.imdbId}
        />
        <MovieButton errors={errors} />
      </form>
    );
  }
}

NewMovie.propTypes = { handleAddMovies: PropTypes.func.isRequired };
