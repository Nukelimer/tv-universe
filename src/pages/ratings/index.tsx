// 619b1df04856155b0484283895823e25

import { Container, Header, Loader, Menu, Segment } from "semantic-ui-react";
import { TVShowTypeSwitch } from "../homepage";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ratedMovies from "./fetch-movie-ratings";
import ratedTVShows from "./fetch-tvshow-rating";
import ColumnDisplay from "../homepage/column-display";
import { Navigate } from "react-router-dom";

const Rated = () => {
  const [activeTab, setActiveTab] = useState<TVShowTypeSwitch>(
    TVShowTypeSwitch.Tvshows
  );

  const { data: ratedMovie, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["movies"],
    queryFn: ratedMovies,
  });

  const { data: ratedTVShow, isLoading: isLoadingTVShows } = useQuery({
    queryKey: ["tvshows"],
    queryFn: ratedTVShows,
  });

  if (localStorage.getItem("guest_session_id") === null) {

    return <Navigate to='../authentication'/>
  }

  if (isLoadingMovies || isLoadingTVShows) { <Loader active /> }
  return (
    <Container style={{ marginTop: 50 }}>
      <Menu pointing secondary>
        <Menu.Item
          name="movies"
          active={activeTab === TVShowTypeSwitch.Movies}
          onClick={() => setActiveTab(TVShowTypeSwitch.Movies)}
        />
        <Menu.Item
          name="tv shows"
          active={activeTab === TVShowTypeSwitch.Tvshows}
          onClick={() => setActiveTab(TVShowTypeSwitch.Tvshows)}
        />
      </Menu>

      <Segment>
        {activeTab === TVShowTypeSwitch.Movies ? (
          <div>
            <Header as={"h2"}>Rated Movies</Header>
            <ColumnDisplay
              data={ratedMovie.results}
              tVShowTypeSwitch={TVShowTypeSwitch.Movies}
              isRated
            />
          </div>
        ) : (
          <div>
            <Header as={"h2"}>Rated TV Shows</Header>
            <ColumnDisplay
              data={ratedTVShow.results}
                tVShowTypeSwitch={TVShowTypeSwitch.Tvshows}
                isRated
            />
          </div>
        )}
      </Segment>
    </Container>
  );
};

export default Rated;
