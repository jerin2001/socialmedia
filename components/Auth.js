import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { supabase } from "@/SupabaseClient";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { useUser } from "@supabase/auth-helpers-react";

export default function Auth() {
  const user = useUser();

  const [validator, setvalidator] = useState(false);
  const [sucessMessage, setsucessMessage] = useState(false);
  const [invalidMessage, setinvalidMessage] = useState(false);
  const [signUpSwitch, setsignUpSwitch] = useState(false);

  const [inputDatas, setinputDatas] = useState({
    email: "",
    password: "",

    avatar_url: "",
  });
  const { email, password, avatar_url } = inputDatas;
  const handleSubmit = async () => {
    if (email !== "" && password !== "") {
      setvalidator(false);
      setinvalidMessage(false);

      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      setsucessMessage(true);
      if (error) {
        console.log("SIGNUP", error);
        setinvalidMessage(error);
        setsucessMessage(false);
      }
    } else {
      setvalidator(true);
      setsucessMessage(false);
    }
    console.log(inputDatas);
    setinputDatas({ email: "", password: "" });
  };

  //signup
  const handleSubmitSignup = async () => {
    if (email !== "" && password !== "") {
      setvalidator(false);
      setinvalidMessage(false);

      //auth
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      setsucessMessage(true);
      if (error) {
        console.log("SIGNUP", error);
        setinvalidMessage(error);
        setsucessMessage(false);
      }
    } else {
      setvalidator(true);
      setsucessMessage(false);
    }
    console.log(inputDatas);
    setinputDatas({ email: "", password: "", avatar_url: "" });
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {!signUpSwitch ? (
          <>
            <form className="login">
              <Typography color="black" sx={{ fontWeight: "bold" }}>
                LOG IN
              </Typography>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setinputDatas({ ...inputDatas, email: e.target.value });
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setinputDatas({ ...inputDatas, password: e.target.value });
                }}
              />
              {validator && (
                <Typography color="red">All fields are mandatory*</Typography>
              )}
              {sucessMessage && (
                <Typography color="green">Login success</Typography>
              )}
              {invalidMessage && (
                <Typography color="red">
                  Email or password incorrect!
                </Typography>
              )}
              <button
                style={{ background: "black" }}
                onClick={(e) => {
                  handleSubmit(e);
                  e.preventDefault();
                }}
              >
                Login
              </button>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ marginTop: 2 }}
              >
                <Typography color="red">{"Don't have an account?"}</Typography>
                <div
                  onClick={() => {
                    setsignUpSwitch(true);
                    setvalidator(false);
                    setsucessMessage(false);
                    setinvalidMessage(false);
                  }}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  {"Sign up"}
                </div>
              </Stack>
            </form>
          </>
        ) : (
          <>
            {/* signup */}

            <form className="login">
              <Typography color="black" sx={{ fontWeight: "bold" }}>
                SIGN UP
              </Typography>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setinputDatas({ ...inputDatas, email: e.target.value });
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setinputDatas({ ...inputDatas, password: e.target.value });
                }}
              />
              {validator && (
                <Typography color="red">All fields are mandatory*</Typography>
              )}
              {sucessMessage && (
                <Typography color="green">
                  We have sent a link to your email!
                </Typography>
              )}
              {invalidMessage && (
                <Typography color="red">Give Strong Password!</Typography>
              )}
              <button
                style={{ background: "black" }}
                onClick={(e) => {
                  handleSubmitSignup(e);
                  e.preventDefault();
                }}
              >
                Sign Up
              </button>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ marginTop: 2 }}
              >
                <Typography color="red">
                  {"Already have an account?"}
                </Typography>
                <div
                  onClick={() => {
                    setsignUpSwitch(false);
                    setvalidator(false);
                    setsucessMessage(false);
                    setinvalidMessage(false);
                  }}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  {"Log in"}
                </div>
              </Stack>
            </form>
          </>
        )}
      </Container>
    </>
  );
}
