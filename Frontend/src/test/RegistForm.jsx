import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FullWidthTextField from "./FullWidthTextField";

export default function RegistForm() {
  const theme = createTheme({
    palette: {
      white: "#ffffff",
      gray: "#f2f2f2",
    },
  });
  return (
    <Box
      justifyContent="center"
      sx={{
        bgcolor: "#f2f2f2",
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <Paper elevation={3}>
        <ThemeProvider theme={theme}>
          <Grid
            sx={{
              padding: 5,
            }}
            container
            spacing={0}
            direction="column"
            alignItems="start"
            justifyContent="center"
            style={{ minHeight: "50vh" }}
          >
            <div style={{ display: "flex" }}>
              <FullWidthTextField content="아이디" />
              <Button
                variant="contained"
                color="white"
                sx={{
                  m: 2.3,
                  height: 50,
                }}
              >
                중복확인
              </Button>
            </div>
            <FullWidthTextField content="비밀번호" />
            <FullWidthTextField content="비밀번호 확인" />
            <div style={{ display: "flex" }}>
              <FullWidthTextField content="닉네임" />
              <Button
                variant="contained"
                color="white"
                sx={{
                  m: 2.3,
                  height: 50,
                }}
              >
                중복확인
              </Button>
            </div>
            <br />
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { t: 10, m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              alignSelf="center"
              alignItems="center"
              justifyContent="center"
            >
              <div>
                <div>
                  <Button
                    variant="contained"
                    size="large"
                    color="white"
                    sx={{
                      width: 300,
                      margin: 1,
                    }}
                  >
                    <div style={{ width: "33%" }}>&nbsp;</div>
                    <span style={{ width: "33%" }}>회원가입</span>
                    <div
                      style={{
                        width: "33%",
                        textAlign: "right",
                        color: "gray",
                      }}
                    >
                      <ArrowForwardIcon />
                    </div>
                  </Button>
                </div>
              </div>
            </Box>
          </Grid>
        </ThemeProvider>
      </Paper>
    </Box>
  );
}
