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

type EventType = React.ChangeEvent<HTMLInputElement>
| React.ChangeEvent<HTMLTextAreaElement>;

export class NewMovie extends React.Component<Props, State> {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  inputHandler = (event: EventType) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={this.submitHandler} className="form">
        <div className="form__title">
          Title
        </div>
        <input
          name="title"
          type="text"
          placeholder="Movie title"
          value={title}
          onChange={this.inputHandler}
          className="form__input"
        />

        <div className="form__title">
          Description
        </div>
        <textarea
          name="decription"
          placeholder="Movie decription..."
          value={description}
          onChange={this.inputHandler}
          className="form__input"
        />
        <div className="form__title">
          Image source
        </div>
        <input
          name="imgUrl"
          type="text"
          placeholder="Image URL"
          value={imgUrl}
          onChange={this.inputHandler}
          className="form__input"
        />

        <div className="form__title">
          Enter imdbUrl
        </div>
        <input
          name="imdbUrl"
          type="text"
          placeholder="Enter imdbUrl"
          value={imdbUrl}
          onChange={this.inputHandler}
          className="form__input"
        />

        <div className="form__title">
          Id
        </div>
        <input
          name="imdbId"
          type="text"
          placeholder="Enter imdbId"
          value={imdbId}
          onChange={this.inputHandler}
          className="form__input"
        />
        <br />

        <button
          type="submit"
          className="form__button"
        >
          Add to list
        </button>
      </form>
    );
  }
}
