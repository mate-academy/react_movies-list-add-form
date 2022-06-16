import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { amber } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };
  const CssTextField = styled(TextField)({
    '&.Mui-focused fieldset': {
      borderColor: amber[500],
    },
  });

  return (
    <form
      onSubmit={
        (event) => {
          event.preventDefault();
          onAdd(movie);
          setTitle('');
          setDescription('');
          setImdbId('');
          setImdbUrl('');
          setImgUrl('');
        }
      }
    >
      <div>
        Set title
      </div>
      <CssTextField
        hiddenLabel
        sx={{ outlineColor: amber[500] }}
        variant="filled"
        size="small"
        type="text"
        required
        placeholder="Set title"
        value={title}
        onChange={
          (event) => setTitle(event.target.value)
        }
      />

      <div>
        Give the description
      </div>
      <TextareaAutosize
        minRows={3}
        style={{ width: 220 }}
        required
        placeholder="Set description"
        value={description}
        onChange={
          (event) => setDescription(event.target.value)
        }
      />

      <div>
        Set image
      </div>
      <CssTextField
        required
        hiddenLabel
        sx={{ outlineColor: amber[500] }}
        variant="filled"
        size="small"
        type="text"
        placeholder="Set image link"
        value={imgUrl}
        onChange={
          (event) => setImgUrl(event.target.value)
        }
      />
      <div>
        Set IMDB url
      </div>
      <CssTextField
        required
        hiddenLabel
        sx={{ outlineColor: amber[500] }}
        variant="filled"
        size="small"
        type="text"
        placeholder="Set IMDB url"
        value={imdbUrl}
        onChange={
          (event) => setImdbUrl(event.target.value)
        }
      />
      <div>
        Set IMDB id
      </div>
      <CssTextField
        required
        hiddenLabel
        sx={{ outlineColor: amber[500] }}
        variant="filled"
        size="small"
        type="text"
        placeholder="Set IMDB id"
        value={imdbId}
        onChange={
          (event) => setImdbId(event.target.value)
        }
      />
      <br />
      <Button
        type="submit"
        sx={{ color: amber[500] }}
      >
        Submit
      </Button>
    </form>
  );
};
