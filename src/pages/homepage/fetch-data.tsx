export const fetchTVShow = async () => {
    const fetchTVShows = await fetch(
        'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTliMWRmMDQ4NTYxNTViMDQ4NDI4Mzg5NTgyM2UyNSIsInN1YiI6IjY1YWU2ZDQwODQ4ZWI5MDBjYTRlNjAxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ykuPV2-INwjPrTGIliBwbcZBwULlNgfG3rputSGF1xw',
        },
      }
    );
    return fetchTVShows.json();
};
  
export const fetchMovie = async () => {
    const fetchMovies = await fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTliMWRmMDQ4NTYxNTViMDQ4NDI4Mzg5NTgyM2UyNSIsInN1YiI6IjY1YWU2ZDQwODQ4ZWI5MDBjYTRlNjAxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ykuPV2-INwjPrTGIliBwbcZBwULlNgfG3rputSGF1xw',
        },
      }
    );
    return fetchMovies.json();
  };