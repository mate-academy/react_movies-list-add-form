import React from 'react';

type Props = {
  inputItems: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  movie: Movie
};

type State = {};

export class InputElement extends React.PureComponent<Props, State > {
  render() {
    const { inputItems } = this.props;

    return (
      <>
        {inputItems.map(inputItem => {
          return (
            <React.Fragment key={inputItem}>
              {inputItem}
              <label htmlFor={inputItem}>
                <input
                  type="text"
                  id={inputItem}
                  name={inputItem}
                  className="block"
                  value={this.props.movie[inputItem as keyof Movie]}
                  required
                  onChange={this.props.handleChange}
                />
              </label>
            </React.Fragment>
          );
        })}
      </>
    );
  }
}
