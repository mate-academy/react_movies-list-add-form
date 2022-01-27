import React from 'react';

import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  description: string;
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  };

  createMovie = (props: Movie) => (
    {
      ...props,
    }
  );

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  addValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault();

        const newMovie = this.createMovie(this.state);

        this.props.onAdd(newMovie);

        this.clearForm();
      }}
      >
        {Object.keys(this.state).map(passkey => (
          <div className="field">
            <label htmlFor={passkey} className="label">
              {passkey[0].toUpperCase() + passkey.slice(1)}
              {passkey === 'description'
                ? (
                  <textarea
                    key={passkey}
                    name={passkey}
                    id={passkey}
                    className="input text-area"
                    placeholder="Enter movie description"
                    value={this.state[passkey as keyof State]}
                    onChange={this.addValue}
                  />
                )
                : (
                  <input
                    key={passkey}
                    name={passkey}
                    id={passkey}
                    className="input"
                    type="text"
                    placeholder={`Enter movie ${passkey}`}
                    required
                    value={this.state[passkey as keyof State]}
                    onChange={this.addValue}
                  />
                )}

            </label>
          </div>
        ))}

        <button type="submit" className="button is-link">Add Movie</button>

      </form>
    );
  }
}
