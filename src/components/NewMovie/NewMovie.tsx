import React, { Component } from 'react';

type Props = {
  onAdd: (newMovie: Movie) => void;
};
type State = Movie;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  formInputChanger = (value: string, key: string) => {
    this.setState((state) => ({
      ...state,
      [key]: value,
    }));
  };

  submitNewMovie = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (!title || !description || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    onAdd(newMovie);

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
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    return (
      <div>
        <h1>Add Movie Form</h1>

        <form className="form" onSubmit={this.submitNewMovie}>
          <input
            type="text"
            placeholder="title"
            className="form__field"
            value={title}
            onChange={(event) => this.formInputChanger(event.target.value, 'title')}
          />
          <input
            type="text"
            placeholder="description"
            className="form__field form__field--description"
            value={description}
            onChange={(event) => this.formInputChanger(event.target.value, 'description')}
          />
          <input
            type="text"
            placeholder="imgUrl"
            className="form__field"
            value={imgUrl}
            onChange={(event) => this.formInputChanger(event.target.value, 'imgUrl')}
          />
          <input
            type="text"
            placeholder="imdbUrl"
            className="form__field"
            value={imdbUrl}
            onChange={(event) => this.formInputChanger(event.target.value, 'imdbUrl')}
          />
          <input
            type="text"
            placeholder="imdbId"
            className="form__field"
            value={imdbId}
            onChange={(event) => this.formInputChanger(event.target.value, 'imdbId')}
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
