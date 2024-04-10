  import { useState } from "react";
  import "./App.scss";
  import { MoviesList } from "./components/MoviesList";
  import { NewMovie } from "./components/NewMovie";
  import moviesFromServer from "./api/movies.json";

  interface Movie {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }

  export const App = () => {
    const [moviesLists, setMoviesList] = useState(moviesFromServer);



    const handleAddMovie = (newMovie: Movie) => {
      setMoviesList((prevMoviesList) => [...prevMoviesList, newMovie]);
    };

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={moviesLists} />
        </div>
        <div className="sidebar">
          <NewMovie onAddMovie={handleAddMovie}/>
        </div>
      </div>
    );
  };
