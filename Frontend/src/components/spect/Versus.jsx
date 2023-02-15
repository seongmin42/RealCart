import React from "react";
import propTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Versus({ queue }) {
  return (
    <Box
      display="flex"
      sx={{
        width: "65%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: "15px",
        borderBottomLeftRadius: "15px",
        // borderTop: "solid 1px #b8b8b8",
        // borderBottom: "solid 1px #b8b8b8",
        // borderLeft: "solid 1px #b8b8b8",
        boxShadow:
          "rgba(6, 24, 44, 0.4) 0px 0px 0px 1px, rgba(6, 24, 44, 0.65) 0px 2px 3px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
      }}
    >
      <Box
        elevation={0}
        sx={{
          display: "flex",
          height: "60%",
          width: "95%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          display="flex"
          sx={{
            height: "100%",
            width: "45%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            display="flex"
            sx={{
              height: "100%",
              width: "30%",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#F52A54",
                fontWeight: "bold",
              }}
            >
              RED
            </Typography>
          </Box>
          <Box
            display="flex"
            sx={{
              height: "100%",
              width: "70%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
              }}
            >
              {queue.player1}
            </Typography>
          </Box>
          {/* <h2>{queue.player1}</h2> */}
        </Box>
        <Box
          display="flex"
          sx={{
            height: "100%",
            width: "10%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              color: "#2E4B8A",
            }}
          >
            vs
          </h2>
        </Box>
        <Box
          display="flex"
          sx={{
            height: "100%",
            width: "45%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            display="flex"
            sx={{
              height: "100%",
              width: "30%",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#4236F5",
                fontWeight: "bold",
              }}
            >
              BLUE
            </Typography>
          </Box>
          <Box
            display="flex"
            sx={{
              height: "100%",
              width: "70%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
              }}
            >
              {queue.player2}
            </Typography>
          </Box>
          {/* <h2>{queue.player2}</h2> */}
        </Box>
      </Box>
    </Box>
  );
}

Versus.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  queue: propTypes.object.isRequired,
};

export default Versus;
