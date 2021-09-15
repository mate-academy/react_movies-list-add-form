import React from 'react';
import { InputField } from '../InputField';

type Props = {
  onAddMovie: (movie: Movie) => void,
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

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleChange = (event: React.ChangeEvent<InputOrTextArea>) => {
    const { name, value } = event.target;

    this.setState(() => ({
      [name]: value,
    } as State));
  };

  getNewMovie = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = { ...this.state };

    this.props.onAddMovie(newMovie);
    this.clearState();
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
      <>
        <h1 className="App__new-movie">Add a Movie</h1>
        <form className="needs-validation" onSubmit={this.getNewMovie}>
          <InputField
            type="text"
            name="title"
            placeholder="Please enter a title"
            pattern="[A-Za-zА-Яа-яЁё0-9!\s]+$"
            value={title}
            onChange={this.handleChange}
          />

          <InputField
            type="text"
            name="description"
            placeholder="Please enter a description"
            pattern="[A-Za-zА-Яа-яЁё0-9!\s\)\(+=._-]+$"
            value={description}
            onChange={this.handleChange}
          />

          <InputField
            type="url"
            name="imgUrl"
            placeholder="Please enter a imgUrl (https://***.*)"
            pattern="^[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
            value={imgUrl}
            onChange={this.handleChange}
          />

          <InputField
            type="url"
            name="imdbUrl"
            placeholder="Please enter a imdbUrl (https://***.*)"
            pattern="^[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
            value={imdbUrl}
            onChange={this.handleChange}
          />

          <InputField
            type="text"
            name="imdbId"
            placeholder="Please enter an imdbId (tt1234567-9)"
            pattern="^[t][t][0-9]{7,9}"
            value={imdbId}
            onChange={this.handleChange}
          />

          <button
            type="submit"
            className="btn btn-success"
          >
            Submit
          </button>
        </form>
      </>
    );
  }
}
