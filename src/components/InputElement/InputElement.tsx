import React from 'react';

type Props = {
  inputItems: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  movie: Movie
};

export const InputElement: React.FC<Props> = (props) => {
  const { inputItems, handleChange, movie } = props;

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
                value={movie[inputItem as keyof Movie]}
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </label>
          </React.Fragment>
        );
      })}
    </>
  );
};
