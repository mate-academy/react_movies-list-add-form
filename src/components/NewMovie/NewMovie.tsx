import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import cn from 'classnames';

type Props = {
  onAdd: (movie : Movie) => void
}

export const NewMovie = ({onAdd}: Props) => {
  const [title, setTitle] = useState('');
  // const [titleError, setTitleError] = useState(false);

  const [description, setDescription] = useState('');
  // const [descriptionError, setDescriptionError] = useState(false);

  const [img, setImg] = useState('');
  // const [imgError, setImgError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  // const [imdbUrlError, setImdbUrlError] = useState(false);

  const [id, setId] = useState('');
  // const [idError, setIdError] = useState(false);


  const [count, setCount] = useState(0);

  const isValid : boolean = title.trim() !== '' && id.trim() !== '' && img.trim() !== '' && imdbUrl.trim() !== '';
  function handleSubmit(event : React.FormEvent) {
    event.preventDefault();

    const movie: Movie = {
      title,
      description,
      imgUrl: img,
      imdbUrl,
      imdbId: id,
    };

    onAdd(movie);
    setCount(count+1);
    setTitle('')
    setDescription('')
    setImg('')
    setId('')
    setImdbUrl('')

  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => {setTitle(event)}}
        required
      />

      <TextField name="description" label="Description" value={description} onChange={(event) => {setDescription(event)}}/>
        {!isValid && <p className={cn({'help is-danger': !isValid})}> Lalalalallalalallalalallalalalallala invalid </p>}

      <TextField name="imgUrl" label="Image URL" value={img} onChange={(event) => {setImg(event)}} required/>

      <TextField name="imdbUrl" label="Imdb URL" value={imdbUrl} onChange={(event) => {setImdbUrl(event)}} required/>

      <TextField name="imdbId" label="Imdb ID" value={id} onChange={(event) => {setId(event)}} required/>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
