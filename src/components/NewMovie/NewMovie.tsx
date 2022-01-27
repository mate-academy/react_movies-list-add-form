import { Component } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string
  imdbId: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  handleClear = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onAdd(this.state);
    this.handleClear();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {Object.keys(this.state).map(item => (
          <label htmlFor={item}>
            <span
              key={item}
              style={{ color: 'blueviolet' }}
            >
              {item.toUpperCase()}
            </span>
            <br />
            <div className="ui inverted segment">
              <input
                key={item}
                id={item}
                type="text"
                name={item}
                value={this.state[item as keyof State]}
                placeholder={`Enter ${item}`}
                onChange={this.handleChange}
              />
            </div>
          </label>
        ))}
        <br />
        <button
          type="submit"
          className="positive ui button"
        >
          Add Movie
        </button>
      </form>
    );
  }
}
