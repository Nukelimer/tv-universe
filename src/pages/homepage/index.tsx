// 619b1df04856155b0484283895823e25
import { Button } from "semantic-ui-react";
import styles from "./styles";
import { useState } from "react";
import ColumnDisplay from "./column-display";
import { fetchMovie, fetchTVShow } from "./fetch-data";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export enum TVShowTypeSwitch {
  Movies = "movies",
  Tvshows = "tvshows",
}

const Homepage = () => {
  const [displayFocus, setDisplayFocus] = useState<TVShowTypeSwitch>(
    TVShowTypeSwitch.Tvshows
  );
  const { data: moviesData, isLoading: moviesIsLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovie,
  });
  const { data: tvShowData, isLoading: tvIsLoading } = useQuery({
    queryKey: ["tvshows"],
    queryFn: fetchTVShow,
  });

  const handleButtonClick = (type: TVShowTypeSwitch) => {
    setDisplayFocus(type);
  };

  const getButtonStyle = (type: TVShowTypeSwitch) => ({
    backgroundColor: displayFocus === type ? "#21ba45" : "inherit",
    transition: "background-color 0.5s ease-in",
    color: displayFocus === type ? "white" : "black",
  });

  // if (localStorage.getItem("guest_session_id") === null) {

  //   return <Navigate to="../authentication" />
  
  // }

  return (
    <div style={styles.wrapper}>
      <Button.Group>
        <Button
          style={getButtonStyle(TVShowTypeSwitch.Tvshows)}
          onClick={() => handleButtonClick(TVShowTypeSwitch.Tvshows)}>
          Tv shows
        </Button>

        <Button
          style={getButtonStyle(TVShowTypeSwitch.Movies)}
          onClick={() => handleButtonClick(TVShowTypeSwitch.Movies)}>
          Movies
        </Button>
      </Button.Group>

      {moviesIsLoading || tvIsLoading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ marginTop: 20 }}>
          {displayFocus === TVShowTypeSwitch.Movies ? (
            <ColumnDisplay
              data={moviesData.results}
              tVShowTypeSwitch={TVShowTypeSwitch.Movies}
            />
          ) : (
            <ColumnDisplay
              data={tvShowData.results}
              tVShowTypeSwitch={TVShowTypeSwitch.Tvshows}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Homepage;
