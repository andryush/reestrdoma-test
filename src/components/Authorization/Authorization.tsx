import React, { useState } from "react";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL } from "../../api/api";

const useStyles = makeStyles(() => ({
  title: {
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    margin: "5px",
    width: "80%",
  },
  button: {
    width: "80%",
    margin: "5px",
  },
}));

type AuthProps = {
  updateToken: Function;
};

export default function Authorization({ updateToken }: AuthProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (event: any): void => {
    switch (event.target.id) {
      case "login":
        setLogin(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
    }
  };

  const getData = (): void => {
    setIsFetching(true);
    fetch(`${API_URL}login/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: login,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        updateToken(data.data.token.access);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsFetching(false));
  };

  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <h1 className={classes.title}>Welcome, please login</h1>

      <form action="" className={classes.form} autoComplete="off">
        <TextField
          id="login"
          label="E-mail"
          variant="outlined"
          className={classes.input}
          onChange={handleChange}
          value={login}
          required
        />
        <TextField
          type="password"
          id="password"
          label="Password"
          variant="outlined"
          className={classes.input}
          onChange={handleChange}
          value={password}
          required
        />
        <Button
          className={classes.button}
          variant="contained"
          size="large"
          color="primary"
          onClick={getData}
          disabled={isFetching}
        >
          LOGIN
        </Button>
      </form>
    </Container>
  );
}
