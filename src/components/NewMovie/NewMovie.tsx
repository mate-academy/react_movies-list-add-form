import React from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  // eslint-disable-next-line max-len
  inputHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState, [name]: value,
    }));
  };

  submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    this.clearAll();
  };

  clearAll = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form className="form">
        <div className="form__item">
          <label className="form__label" htmlFor="title">
            Title:
            <input
              className="form__input"
              name="title"
              value={title}
              type="text"
              onChange={this.inputHandler}
            />
          </label>
        </div>

        <div className="form__item">
          <label className="form__label" htmlFor="title">
            imgUrl:
            <input
              className="form__input"
              name="imgUrl"
              value={imgUrl}
              type="text"
              onChange={this.inputHandler}
            />
          </label>
        </div>

        <div className="form__item">
          <label className="form__label" htmlFor="imdbUrl">
            imdbUrl:
            <input
              className="form__input"
              name="imdbUrl"
              value={imdbUrl}
              type="text"
              onChange={this.inputHandler}
            />
          </label>
        </div>

        <div className="form__item">
          <label className="form__label" htmlFor="imdbId">
            imdbId:
            <input
              className="form__input"
              name="imdbId"
              value={imdbId}
              type="text"
              onChange={this.inputHandler}
            />
          </label>
        </div>

        <div className="form__textarea">
          <label className="form__label" htmlFor="description">
            Description:
            <textarea
              className="form__textarea"
              name="description"
              value={description}
              onChange={this.inputHandler}
            />
          </label>
        </div>
        <button
          type="submit"
          className="form__button"
          onClick={this.submitHandler}
        >
          Add
        </button>
      </form>
    );
  }
}
