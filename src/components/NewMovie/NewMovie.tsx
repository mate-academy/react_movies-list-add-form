import React from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
    } = this.state;

    const newFilm = {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
    };

    this.props.onAdd(newFilm);

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
      <form onSubmit={this.handleSubmit}>
        <h3 className="title is-3">Fill free to add your favorite film</h3>

        <div className="field">
          <label className="label" htmlFor="title">
            Title
            <div className="control">
              <input
                className="input mt-1"
                id="title"
                name="title"
                type="text"
                placeholder="Enter the title"
                value={title}
                onChange={this.handleInputChange}
              />
            </div>
          </label>
        </div>

        <div className="field">
          <label className="label" htmlFor="description">
            Description
            <div className="control">
              <textarea
                id="description"
                name="description"
                className="textarea mt-1"
                placeholder="Enter description"
                value={description}
                onChange={this.handleInputChange}
              />
            </div>
          </label>
        </div>

        <div className="field">
          <label className="label" htmlFor="imgUrl">
            Poster link
            <div className="control">
              <input
                className="input mt-1"
                id="imgUrl"
                name="imgUrl"
                type="text"
                placeholder="Please enter link for the poster"
                value={imgUrl}
                onChange={this.handleInputChange}
              />
            </div>
          </label>
        </div>

        <div className="field">
          <label className="label" htmlFor="imdbUrl">
            IMDB
            <div className="control">
              <input
                className="input mt-1"
                id="imdbUrl"
                name="imdbUrl"
                type="text"
                placeholder="Please enter link to the IMDB"
                value={imdbUrl}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="field mt-2">
              <label className="label" htmlFor="imdbId">
                Film ID
                <div className="control">
                  <input
                    className="input mt-1 mb-3"
                    id="imdbId"
                    name="imdbId"
                    type="text"
                    placeholder="Please enter id of the film on IMDB"
                    value={imdbId}
                    onChange={this.handleInputChange}
                  />
                </div>
              </label>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="button is-primary is-fullwidth"
          disabled={!title || !imdbUrl || !imgUrl || !imdbId}
        >
          Add new film
        </button>

      </form>
    );
  }
}
