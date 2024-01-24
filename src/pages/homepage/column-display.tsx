import { Card, Form, Grid, Label } from "semantic-ui-react";
import { TVShowTypeSwitch } from ".";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ratingMovie from "./ratingMovie";
import ratingTVShow from "./ratingTvShow";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DataToDisplay {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: string;
  release_date: string;
  first_air_date: string;
  vote_count: number;
  rating? : number

}

interface Props {
  data: DataToDisplay[];
  tVShowTypeSwitch: TVShowTypeSwitch;
  isRated?: boolean;
}

const MovieErrorToast = () => {
  toast.error(`Error occurred rating the movie!`);
};

const TVShowErrorToast = () => {
  toast.error(`Error occurred rating the TV Show!`);
};

const ColumnDisplay = (props: Props) => {
  const { data, tVShowTypeSwitch, isRated } = props;
  const [rating, setRating] = useState(0);

  const { mutate: rateMovieMutation } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: (id: number) => ratingMovie(id, rating),
    onSuccess: () =>
      rating < 0.5
        ? toast.error("you didnt rate this movie.")
        : toast.success(`You successfully rated this movie!`),

    onError: MovieErrorToast,
  });

  const { mutate: rateTVShowMutation } = useMutation({
    mutationKey: ["rateTVShow"],
    mutationFn: (id: number) => ratingTVShow(id, rating),
    onSuccess: () =>
      rating < 0.5
        ? toast.error("you didnt rate this TV Show.")
        : toast.success(`You successfully rated this TV show!`),
    onError: TVShowErrorToast,
  });

  const rateHandler =
    tVShowTypeSwitch === TVShowTypeSwitch.Movies
      ? rateMovieMutation
      : rateTVShowMutation;
  return (
    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded={"vertically"}>
      {data?.map((mappedData: DataToDisplay) => {
        return (
          <Grid.Column key={mappedData.id} style={{borderTop : '1px solid black'}}>
            <Card.Group  >
              <Link 
                to={`/${
                  tVShowTypeSwitch === TVShowTypeSwitch.Movies
                    ? "movie"
                    : "tvshow"
                }/${mappedData.id}`}>
                <Card style={{height: 750, marginTop: 22, }}
                  fluid
                  image={`https://image.tmdb.org/t/p/original/${mappedData.poster_path}`}
                  header={
                    tVShowTypeSwitch === TVShowTypeSwitch.Movies
                      ? mappedData.title
                      : mappedData.name
                  }
                  meta={` ${
                    tVShowTypeSwitch === TVShowTypeSwitch.Movies
                      ? `Release: ${mappedData.release_date}`
                      : ` Airing: ${mappedData.first_air_date}`
                  } || Reviews: ${mappedData.vote_average}`}
                  description={mappedData.overview.slice(0, 200) + "..."}
                />

                {isRated && <Label style={{background: 'teal', color: 'white'}}> Your rating was: {mappedData.rating} / 10.</Label> }
              </Link>
              <Form style={{ marginTop: 10 }}>
                <Form.Group inline>
                  <Form.Field>
                    <Form.Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      onChange={(event) => {
                        setRating(+event.target.value);
                      }}
                      action={{
                        color: "green",
                        labelPosition: "right",
                        icon: "star",
                        content: "Rate",
                        onClick: () => {
                          rateHandler(mappedData.id);
                        },
                      }}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Card.Group>
          </Grid.Column>
        );
      })}
    </Grid>
  );
};

export default ColumnDisplay;
