import './App.scss';
import { useState } from 'react';
import moviesFromServer from './api/movies.json';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { Movie } from './types/Movie';

export const App = () => {
  const [add, setAdd] = useState('');
  const [newMovieList, setNewMovieList] = useState<Movie[]>([...moviesFromServer]);
  const [formData, setFormData] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  if (add === 'add') {
    setNewMovieList((prev => [...prev, formData]))
    setAdd('');
  }

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMovieList} />
      </div>
      <div className="sidebar">
        <NewMovie
          formData={formData}
          setFormData={setFormData}
          setAdd={setAdd}
        />
      </div>
    </div>
  );
};
