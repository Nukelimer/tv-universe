import { Button, Segment, Header, Form, Grid } from "semantic-ui-react";
import { useMutation } from "@tanstack/react-query";
import login from "./login";
import { styles } from "./styles";
import { useNavigate } from "react-router-dom";
import "./index.module.css";

function Authentication() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("guest_session_id", data.guest_session_id);
      navigate("../");
    },
  });

  const loginHandler = async () => {
    await mutate();
  };

  return (
    <Grid
      textAlign="center"
      key={2}
      verticalAlign="middle"
      style={styles.grid}
      className={"slide-left"}>
      <Grid.Column style={styles.gridColumn}>
        <Header
          as={"h2"}
          textAlign="center"
          color="green"
          style={styles.header}>
          Login as a guest without credentials {``}
        </Header>

        <Form size="large">
          <Segment style={styles.segment} onClick={loginHandler}>
            <Button color="green" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default Authentication;
