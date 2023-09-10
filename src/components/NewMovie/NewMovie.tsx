import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type MovieProps = {
  onAdd: (movie:Movie) => void;
};

const getPropName = (field:string):string => {
  const fieldName = field.split('!').pop() || field;

  return (fieldName[0].toLowerCase() + fieldName.split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join('').slice(1)).replace('image', 'img');
};

export const NewMovie:React.FC<MovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const fields:{
    [fieldName:string]: [
      string,
      React.Dispatch<React.SetStateAction<string>>,
    ];
  } = {
    '!Title': useState<string>(''),
    Description: useState<string>(''),
    '!Image URL': useState<string>(''),
    '!Imdb URL': useState<string>(''),
    '!Imdb ID': useState<string>(''),
  };
  const isFormDisabled = Math.min(...Object.keys(fields)
    .filter(field => field[0] === '!')
    .map(fieldName => fields[fieldName][0].length)) === 0;

  const handleSubmit = (event:FormEvent):void => {
    event.preventDefault();
    if (!isFormDisabled) {
      const movieData:Movie = Object.keys(fields)
        .reduce((movie, field) => Object.assign(movie, {
          [getPropName(field)]: fields[field][0],
        }), {}) as Movie;

      onAdd(movieData);
      setCount(count + 1);
      Object.keys(fields).forEach((name:string) => fields[name][1](''));
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>
      {Object.keys(fields).map((field:string) => (
        <TextField
          key={field}
          name={getPropName(field)}
          label={`${field.split('!').pop() || field}`}
          value={fields[field][0]}
          onChange={fields[field][1]}
          required={field.split('!').length === 2}
        />
      ))}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFormDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
