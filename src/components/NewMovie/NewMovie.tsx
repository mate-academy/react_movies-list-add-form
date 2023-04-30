import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

enum MovieField {
  title = 'title',
  description = 'description',
  imgUrl = 'imgUrl',
  imdbUrl = 'imdbUrl',
  imdbId = 'imdbId',
}
type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const emptyMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [newMovie, setNewMovie] = useState(emptyMovie);
  const [isAddDisabled, setIsAddDisabled] = useState(true);

  useEffect(() => {
    setIsAddDisabled(() => {
      return Object.values(newMovie).some((el, i) => (i === 1 ? false : !el));
    });
  }, [newMovie]);

  const generateLabel = (str: string) => {
    let label = str.replace(/([A-Z])/g, ' $1');

    label = label.charAt(0).toUpperCase() + label.slice(1);

    if (label.split(' ')[1]) {
      const parts = label.split(' ');

      parts[1] = parts[1].toUpperCase();
      label = parts.join(' ');
    }

    return label;
  };

  const handleChange = (targetKey: string, value: string) => {
    setNewMovie((prev) => {
      const movieKey = targetKey as MovieField;
      const movieCopy = { ...prev };

      movieCopy[movieKey] = value;

      return movieCopy;
    });
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    onAdd(newMovie);
    setCount(prev => prev + 1);
    setNewMovie(emptyMovie);
  };

  const validateCustom = ({ dataset, value }: HTMLInputElement) => {
    const targetKey = dataset.cy?.split('-')[1];
    // eslint-disable-next-line
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    // write custom requirements
    switch (targetKey) {
      case MovieField.imdbUrl:
      case MovieField.imgUrl:
      case MovieField.imdbId:
        return !!value.match(pattern);
      default:
        return true;
    }
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      {Object.entries(newMovie).map(([key, value]) => {
        const label = generateLabel(key);

        return (
          <TextField
            key={key}
            name={key}
            label={label}
            value={value}
            onChange={(newValue) => handleChange(key, newValue)}
            required={key !== MovieField.description}
            validateCustom={validateCustom}
          />
        );
      })}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAddDisabled}
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
