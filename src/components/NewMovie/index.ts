import { Movie } from '../../types/Movie';

export function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
  title: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  description: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  setImdbId: React.Dispatch<React.SetStateAction<string>>,
  setImdbUrl: React.Dispatch<React.SetStateAction<string>>,
  setImgUrl: React.Dispatch<React.SetStateAction<string>>,
  setCount: React.Dispatch<React.SetStateAction<number>>,
  onAdd: (movie: Movie) => void,
) {
  event.preventDefault();

  if (title.trim() && imgUrl.trim() && imdbId.trim() && imdbUrl.trim()) {
    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
    setCount(prev => prev + 1);
    onAdd({
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      description,
    });
  }
}

export * from './NewMovie';
