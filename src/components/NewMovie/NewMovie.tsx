/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  titleIsInvalid: boolean,
  descriptionIsInvalid: boolean,
  imgUrlIsInvalid: boolean,
  imdbIdIsInvalid: boolean,
  imdbUrlIsInvalid: boolean,
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleIsInvalid: false,
    descriptionIsInvalid: false,
    imgUrlIsInvalid: false,
    imdbIdIsInvalid: false,
    imdbUrlIsInvalid: false,
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    // this.setState({[name]: value}) - doesn't work

    if (name === 'title') {
      this.setState({
        titleIsInvalid: false,
        title: value,
      });
    } else if (name === 'description') {
      this.setState({
        description: value,
        descriptionIsInvalid: false,
      });
    } else if (name === 'imgUrl') {
      this.setState({
        imgUrl: value,
        imgUrlIsInvalid: false,
      });
    } else if (name === 'imdbUrl') {
      this.setState({
        imdbUrl: value,
        imdbUrlIsInvalid: false,
      });
    } else if (name === 'imdbId') {
      this.setState({
        imdbId: value,
        imdbIdIsInvalid: false,
      });
    }
  };

  createMovie = () => {
    return ({
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    });
  };

  onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (
      title
      && description
      && imgUrl
      && imdbUrl
      && imdbId) {
      const newMovie = this.createMovie();

      this.props.onAdd(newMovie);
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        titleIsInvalid: false,
        descriptionIsInvalid: false,
        imgUrlIsInvalid: false,
        imdbIdIsInvalid: false,
        imdbUrlIsInvalid: false,
      });
    }

    if (!title) {
      this.setState({
        titleIsInvalid: true,
      });
    }

    if (!description) {
      this.setState({
        descriptionIsInvalid: true,
      });
    }

    if (!imgUrl) {
      this.setState({
        imgUrlIsInvalid: true,
      });
    }

    if (!imdbId) {
      this.setState({
        imdbIdIsInvalid: true,
      });
    }

    if (!imdbUrl) {
      this.setState({
        imdbUrlIsInvalid: true,
      });
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleIsInvalid,
      descriptionIsInvalid,
      imgUrlIsInvalid,
      imdbIdIsInvalid,
      imdbUrlIsInvalid,
    } = this.state;

    return (
      <form className="row new-movie-form" onSubmit={this.onSubmitHandler}>
        <h3 className="text-center mb-3">Add a movie Form</h3>
        <div
          className={
            classNames(
              'form-floating mb-3 new-movie-form__input-container',
              {
                invalid: titleIsInvalid,
              },
            )
          }
        >
          <input
            type="text"
            className="form-control"
            id="floatingTitle"
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <label htmlFor="floatingTitle">Title</label>
        </div>
        <div
          className={
            classNames(
              'form-floating mb-3 new-movie-form__input-container',
              {
                invalid: descriptionIsInvalid,
              },
            )
          }
        >
          <textarea
            className="form-control"
            id="floatingDescription"
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <label htmlFor="floatingDescription">Description</label>
        </div>
        <div
          className={
            classNames(
              'form-floating mb-3 new-movie-form__input-container',
              {
                invalid: imgUrlIsInvalid,
              },
            )
          }
        >
          <input
            type="text"
            className="form-control"
            placeholder="ImgUrl"
            id="floatingImgUrl"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
          <label htmlFor="floatingImgUrl">ImgUrl</label>
        </div>
        <div
          className={
            classNames(
              'form-floating mb-3 new-movie-form__input-container',
              {
                invalid: imdbUrlIsInvalid,
              },
            )
          }
        >
          <input
            type="text"
            className="form-control"
            id="floatingImdbUrl"
            placeholder="ImdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
          <label htmlFor="floatingImdbUrl">ImdbUrl</label>
        </div>
        <div
          className={classNames(
            'form-floating mb-3 new-movie-form__input-container',
            {
              invalid: imdbIdIsInvalid,
            },
          )}
        >
          <input
            type="text"
            className="form-control"
            id="floatingImdbId"
            placeholder="ImdbId"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
          <label htmlFor="floatingImdbId" className="pe-2">ImdbId</label>
        </div>
        <div className="d-flex">
          <button type="submit" className="btn btn-primary mt-3 w-50 align-self-center">Add!</button>
        </div>
      </form>
    );
  }
}
