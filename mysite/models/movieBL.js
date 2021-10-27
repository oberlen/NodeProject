const jsonDAL = require("../DAL/jsonDAL");
const apiMovieDAL = require("../DAL/showApiDAL");

const writeMovieToJson = async function (obj) {

  let resp = await jsonDAL.getShows();
  let movies = resp.movies;
  let newId;

  if (movies.length == 0) {
    let movieApiResp = await apiMovieDAL.getShows();
    let movieApi = movieApiResp.data;

    newId = movieApi[movieApi.length - 1].id + 1;
    // console.log(newId);
  } else {
    newId = movies[movies.length - 1].id + 1;
    // console.log(newId);
  }
  let movieObj = {
    id: newId,
    name: obj.name,
    language: obj.language,
    genres: [obj.genres],
  };
  movies.push(movieObj);
  let status = await jsonDAL.saveMovie({ movies: movies });
  return status;
};
const searchMoviesFunc = async function (obj) {
        // let searchMovie=[]

        let resp = await jsonDAL.getShows();
        let movies = resp.movies;

        let movieApiResp = await apiMovieDAL.getShows();
        let movieApi = movieApiResp.data;

        let allMovies=movieApi.concat(movies)
        // console.log(allMovies[allMovies.length - 1]);

        let search=allMovies.filter(x=>
                x.name.toLowerCase().includes(obj.name.toLowerCase())
                 && x.language.toLowerCase()==obj.language.toLowerCase()
                  && x.genres.includes(obj.genres))
      
          return search
      
}

const getAllMovies=async()=> 
{
  let resp = await jsonDAL.getShows();
  let movies = resp.movies;

  let movieApiResp = await apiMovieDAL.getShows();
  let movieApi = movieApiResp.data;

  let allMovies=movieApi.concat(movies)

  return allMovies
}


const findSameGenres = async (genre) => {
  let allMovies = await getAllMovies();

  let sameGenre = allMovies.filter((movie) => movie.genres.includes(genre));
  sameGenre = sameGenre.map((movie) => movie.name);
  return sameGenre;
};
module.exports = { writeMovieToJson ,searchMoviesFunc,findSameGenres,getAllMovies};
