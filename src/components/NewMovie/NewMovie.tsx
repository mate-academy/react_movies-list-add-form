import React, { FormEvent } from 'react';

type Props = {
  addMovie: (movie: Movie) => void,
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = { ...this.state };
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    if (title && description && imgUrl && imdbUrl && imdbId) {
      this.props.addMovie(newMovie);
      this.clearState();
    }
  };

  clearState = () => {
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
      imdbUrl,
      imgUrl,
      imdbId,
    } = this.state;

    return (
      <>
        <h1 className="Add__film__title">Add New Movie</h1>
        <div className="form__container">
          <form onSubmit={this.handleSubmit}>
            <input
              className="input input__title"
              type="text"
              name="title"
              placeholder="Enter the title"
              value={title}
              onChange={this.handleChange}
            />

            <input
              className="input input__description"
              type="text"
              name="description"
              placeholder="Enter the description"
              value={description}
              onChange={this.handleChange}
            />

            <input
              className="input input__imgUrl"
              type="text"
              name="imgUrl"
              placeholder="Enter the imgUrl"
              value={imgUrl}
              onChange={this.handleChange}
            />

            <input
              className="input input__imdbUrl"
              type="text"
              name="imdbUrl"
              placeholder="Enter the imdbUrl"
              value={imdbUrl}
              onChange={this.handleChange}
            />

            <input
              className="input input__imdbId"
              type="text"
              name="imdbId"
              placeholder="Enter the imdbId"
              value={imdbId}
              onChange={this.handleChange}
            />

            {(!title || !description || !imgUrl || !imdbUrl || !imdbId)
              ? (
                <div className="warning__message">
                  Please, fill in form fields and push the button «Add movie»
                </div>
              )
              : (
                <div className="accepted__message">
                  All fields are filled in
                </div>
              )}

            <button
              type="submit"
              className="button__addMovie"
            >
              Add movie
            </button>
          </form>
        </div>
      </>
    );
  }
}
