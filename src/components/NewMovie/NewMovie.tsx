import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void
}

export const NewMovie : React.FC<Props> = ({onAdd}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [imdbUrl, setImdbUrl] = useState('')
  const [imdbId, setImdbId] = useState('')

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setImgUrl('')
    setImdbId('')
    setImdbUrl('')
  }

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();

    setCount(prevCount => prevCount + 1)

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId
    })

    resetForm()
   
  }

  const isFormaValid = title && imgUrl && imdbUrl && imdbId;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title" 
        label="Title"
        value={title}
        onChange={(e) => { setTitle(e.trimStart()) }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(e) => { setDescription(e.trimStart()) }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(e) => { setImgUrl(e.trimStart()) }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(e) => { setImdbUrl(e.trimStart()) }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(e) => { setImdbId(e.trimStart()) }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled = {!isFormaValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
