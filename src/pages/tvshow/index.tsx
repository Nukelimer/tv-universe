import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Grid, Header, Loader, Segment, Image, List } from 'semantic-ui-react';
import { fetchTVShowDetails } from './fetch-data';

const TVShow = () => {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Invalid TV Show ID</div>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: () => fetchTVShowDetails(id),
  });

  if (isLoading) {
    return <Loader active />;
  }
  return (
    <div style={{ marginTop: 60 }}>
      <Segment>
        <Header>{data.title}</Header>
        <Grid column={2} divided textAlign="left" style={{ marginTop: 20 }}>
          <Grid.Row>
            <Grid.Column width={6}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                />
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <List>
                {data.first_air_date && (
                  <List.Item>
                    <List.Header> First Air Date:</List.Header>
                    {data.first_air_date}
                  </List.Item>
                )}
                {data.adult === 'Yes' ? (
                  <List.Item>
                    <List.Header> This show is rated:</List.Header>
                    18+
                  </List.Item>
                ) : (
                  <List.Item>
                    <List.Header> This show is rated:</List.Header>
                    -18
                  </List.Item>
                )}

                {data.budget > 0 && (
                  <List.Item>
                    <List.Header> Budget:</List.Header>
                    {data.budget}
                  </List.Item>
                )}

                <List.Item>
                  <List.Header> Genre:</List.Header>
                  {data.genres?.map((names: any) => {
                    return <List.Item key={names.id}>{names.name}</List.Item>;
                  })}
                </List.Item>

                <List.Item>
                  <List.Header> IMDB ID:</List.Header>
                  {data.imdb_id}
                </List.Item>

                <List.Item>
                  <List.Header> Production Companies:</List.Header>
                  {data?.production_companies
                    .map((company: any) => {
                      return company.name;
                    })
                    .join(', ')}
                </List.Item>
                <List.Item>
                  <List.Header> Release Date:</List.Header>
                  {data.release_date}
                </List.Item>

                <List.Item>
                  <List.Header> Runtime:</List.Header>
                  {data.runtime}
                </List.Item>

                {data.episode_run_time ? (
                  <List.Item>
                    <List.Header> Per Episode Runtime:</List.Header>
                    {data.episode_run_time}
                  </List.Item>
                ) : undefined}

                {data.revenue > 0 && (
                  <List.Item>
                    <List.Header> Revenue:</List.Header>
                    {data.revenue}
                  </List.Item>
                )}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default TVShow;
