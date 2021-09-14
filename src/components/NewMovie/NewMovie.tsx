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

    this.setState({
      [name]: value,
    } as State);
  };

  getNewMovie = (event: React.FormEvent) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAddMovie(newMovie);
    this.clearState();
  };

  render() {
    return (
      <>
        <h1 className="App__new-movie">Add a Movie</h1>
        <form className="was-validated" onSubmit={this.getNewMovie}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="form-control is-invalid"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
            <div className="invalid-feedback">
              {!this.state.title && 'Please enter a title'}
            </div>
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="description"
              className="form-control is-invalid"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
              required
            />
            <div className="invalid-feedback">
              {!this.state.description && 'Please enter a text'}
            </div>
          </div>

          <div className="mb-3">
            <input
              type="url"
              name="imgUrl"
              className="form-control is-invalid"
              placeholder="imgUrl"
              pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
              value={this.state.imgUrl}
              onChange={this.handleChange}
              required
            />
            <div className="invalid-feedback">
              {!this.state.imgUrl && 'Please enter a url (https://***.*)'}
            </div>
          </div>

          <div className="mb-3">
            <input
              type="url"
              name="imdbUrl"
              className="form-control is-invalid"
              placeholder="imdbUrl"
              pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
              value={this.state.imdbUrl}
              onChange={this.handleChange}
              required
            />
            <div className="invalid-feedback">
              {!this.state.imdbUrl && 'Please enter a url (https://***.*)'}
            </div>
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="imdbId"
              className="form-control is-invalid"
              placeholder="imdbId"
              pattern="^[t][t][0-9]{7,9}"
              value={this.state.imdbId}
              onChange={this.handleChange}
              required
            />
            <div className="invalid-feedback">
              {!this.state.imdbId && 'Please enter an id (tt1234567-9)'}
            </div>
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
