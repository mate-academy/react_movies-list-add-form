import React from 'react';

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

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Please enter a title"
              value={title}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Please enter a description"
              value={description}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="url"
              name="imgUrl"
              className="form-control"
              placeholder="Please enter a imgUrl (https://***.*)imgUrl"
              pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
              value={imgUrl}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="url"
              name="imdbUrl"
              className="form-control"
              placeholder="Please enter a imdbUrl (https://***.*)imdbUrl"
              pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
              value={imdbUrl}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="imdbId"
              className="form-control"
              placeholder="Please enter an imdbId (tt1234567-9)"
              pattern="^[t][t][0-9]{7,9}"
              value={imdbId}
              onChange={this.handleChange}
              required
            />
          </div>

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
