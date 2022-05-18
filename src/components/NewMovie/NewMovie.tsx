import React from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};
interface State {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
      <form onSubmit={this.handleSubmit}>
        {Object.keys(this.state).map(item => (
          <div>
            <label htmlFor={item}>
              {item}
              <br />
              <input
                key={item}
                id={item}
                type="text"
                name={item}
                value={this.state[item as keyof State]}
                placeholder={item}
                onChange={this.handleChange}
              />
            </label>
          </div>
        ))}
        <button type="submit">Add Movie</button>
      </form>
    );
  }
}
