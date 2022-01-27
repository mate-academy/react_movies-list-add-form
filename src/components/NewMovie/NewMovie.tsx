import React, { Component } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
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

  handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    this.props.onAdd(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        {
          Object.keys(this.state).map(property => (
            <div>
              <label
                key={property}
                htmlFor={property}
              >
                {property}
                <br />
                <input
                  type="text"
                  name={property}
                  id={property}
                  value={this.state[property as keyof State]}
                  onChange={this.handleChangeField}
                />
              </label>
            </div>
          ))
        }
        <button
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}
