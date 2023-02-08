/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import kurentoUtils from "kurento-utils";
import Stomp from "stompjs";
import axios from "axios";
import tutorial from "../assets/toturial.png";
import rhombusLap from "../assets/rhombus_lab.png";
import rhombusPlace from "../assets/rhombus_place.png";
import RectangleBest from "../assets/Rectangle_Best.png";
import RectangleRace from "../assets/Rectangle_Racetime.png";
import TransparentImg from "../assets/img/transparent-1px.png";
import TransparentImg2 from "../assets/img/transparent-copy.png";
import WebRtcImg from "../assets/img/webrtc.png";
import Spinner from "../assets/img/spinner.gif";
import Advertise from "../assets/img/advertise.png";
import CountdownOne from "../assets/count_1.png";
import CountdownTwo from "../assets/count_2.png";
import CountdownThree from "../assets/count_3.png";
import CountdownStart from "../assets/START.png";

function PlayPage() {
  const [isTutorial, setIsTutorial] = useState(true);
  const [ParticipantA, setParticipantA] = useState("의권짱짱33");
  const [ParticipantB, setParticipantB] = useState("지존ㅎHzㅣㄴ");
  const user = useSelector((state) => state.login.user);

  const [ws, setWs] = useState(null);
  const [socket, setSocket] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const video = useRef(null);
  const text = useRef(null);
  var webRtcPeer;
  var mediaId;

  function presenterResponse(message) {
    if (message.response != "accepted") {
      var errorMsg = message.message ? message.message : "Unknow error";
      console.info("Call not accepted for the following reason: " + errorMsg);
      dispose();
    } else {
      webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    }
  }

  function sendChat(e) {
    e.preventDefault();
    if (text.current.value === "") return;
    if (text.current.value.length > 100)
      return alert("댓글은 100자 이내로 입력해주세요");
    stompClient.send(
      "/publish/messages",
      {},
      JSON.stringify({
        message: `${user.nickname} : ${text.current.value}`,
        senderId: 7,
        receiverId: 14,
      })
    );
    text.current.value = "";
  }
  function viewerResponse(message) {
    if (message.response != "accepted") {
      var errorMsg = message.message ? message.message : "Unknow error";
      console.info("Call not accepted for the following reason: " + errorMsg);
      dispose();
    } else {
      webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    }
  }

  function presenter(num) {
    if (!webRtcPeer) {
      showSpinner(video.current);
    }
    var options = {
      localVideo: video.current,
      onicecandidate: onIceCandidate,
    };
    mediaId = num;
    webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
      options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        webRtcPeer.generateOffer(onOfferPresenter);
      }
    );
  }

  function onOfferPresenter(error, offerSdp) {
    if (error) return console.error("Error generating the offer");
    console.info("Invoking SDP offer callback function " + mediaId);
    var message = {
      id: "presenter",
      sdpOffer: offerSdp,
      mediaId: mediaId,
    };
    sendMessage(message);
  }

  function viewer(num) {
    if (!webRtcPeer) {
      showSpinner(video.current);
    }
    mediaId = num;
    console.log(num);
    var options = {
      remoteVideo: video.current,
      onicecandidate: onIceCandidate,
    };
    webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
      options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        this.generateOffer(onOfferViewer);
      }
    );
  }

  function onOfferViewer(error, offerSdp) {
    if (error) return console.error("Error generating the offer");
    console.info("Invoking SDP offer callback function " + mediaId);
    var message = {
      id: "viewer",
      sdpOffer: offerSdp,
      mediaId: mediaId,
    };
    sendMessage(message);
  }

  function onIceCandidate(candidate) {
    console.log("Local candidate" + JSON.stringify(candidate));

    var message = {
      id: "onIceCandidate",
      candidate: candidate,
      mediaId: mediaId,
    };
    sendMessage(message);
  }

  function stop() {
    var message = {
      id: "stop",
    };
    sendMessage(message);
    dispose();
  }

  function dispose() {
    if (webRtcPeer) {
      webRtcPeer.dispose();
      webRtcPeer = null;
    }
    hideSpinner(video.current);
  }

  function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    console.log("Sending message: " + jsonMessage);
    ws.send(jsonMessage);
  }

  function showSpinner() {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].poster = TransparentImg;
      arguments[
        i
      ].style.background = `center transparent url(${Spinner}) no-repeat`;
    }
  }

  function hideSpinner() {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].src = "";
      arguments[i].poster = Advertise;
      arguments[i].style.background = "";
    }
  }

  useEffect(() => {
    setInterval(() => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`).then((res) => {
        const users = res.data;
        const ran1 = Math.floor(Math.random() * users.length);
        const ran2 = Math.floor(Math.random() * users.length);
        setParticipantA(users[ran1].nickname);
        setParticipantB(users[ran2].nickname);
      });
    }, 5000);

    const wsConst = new WebSocket(`${process.env.REACT_APP_MEDIA_URL}/call`);
    const socketConst = new WebSocket(
      `${process.env.REACT_APP_MEDIA_URL}/chat`
    );
    const stompClientConst = Stomp.over(socketConst);
    stompClientConst.connect({}, function () {
      stompClientConst.subscribe("/subscribe", function (greeting) {
        console.log(greeting.body);
        // const newchat = `${user.nickname} : ` + greeting.body;
        setChats((currentArray) => [...currentArray, greeting.body]);
      });
    });

    setWs(wsConst);
    setSocket(socketConst);
    setStompClient(stompClientConst);

    return () => {
      wsConst.close();
      socketConst.close();
    };
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = function (message) {
        var parsedMessage = JSON.parse(message.data);
        console.info("Received message: " + message.data);

        switch (parsedMessage.id) {
          case "presenterResponse":
            presenterResponse(parsedMessage);
            break;
          case "viewerResponse":
            viewerResponse(parsedMessage);
            break;
          case "iceCandidate":
            webRtcPeer.addIceCandidate(
              parsedMessage.candidate,
              function (error) {
                if (error)
                  return console.error("Error adding candidate: " + error);
              }
            );
            break;
          case "stopCommunication":
            dispose();
            break;
          default:
            console.error("Unrecognized message", parsedMessage);
        }
      };

      ws.onopen = () => {
        setTimeout(() => {
          viewer(1);
        }, 1000);
      };
    }
  }, [ws]);

  const wss = new WebSocket("wss://i8a403.p.ssafy.io:8581");

  wss.onclose = function close() {
    console.log("disconnected");
  };
  const images = [
    TransparentImg2,
    CountdownThree,
    CountdownTwo,
    CountdownOne,
    CountdownStart,
    TransparentImg,
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 5500);
  }, []);

  wss.onmessage = function incoming(data) {
    if (data === "1") {
      setInterval(() => {
        for (let i = 0; i < 4; i++) {
          setInterval(() => {
            return <Box component="img" src={images[i]} alt="slide" />;
          }, 1000);
        }
      }, 2000);
    }
  };

  const [keyState, setKeyState] = useState({});
  const [inputSwitch, setInputSwitch] = useState({
    16: false,
    37: false,
    38: false,
    39: false,
    40: false,
  });
  useEffect(() => {
    setTimeout(() => {
      setIsTutorial(false);
    }, 10000);
    window.addEventListener(
      "keydown",
      (e) => {
        setKeyState((prevState) => ({
          ...prevState,
          [e.keyCode || e.which]: true,
        }));
        if (e.keyCode === 86) {
          console.log(isTutorial);
          setIsTutorial((prevState) => !prevState);
        }
      },
      true
    );
    window.addEventListener(
      "keyup",
      (e) => {
        if (e.keyCode === 37 || e.keyCode === 39) {
          setTimeout(() => {
            console.log("stop");
            wss.send(41);
          }, 100);
        }
        setKeyState((prevState) => ({
          ...prevState,
          [e.keyCode || e.which]: false,
        }));
      },
      true
    );
  }, []);

  useEffect(() => {
    if (keyState[16] && inputSwitch[16] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        16: true,
      }));
      const interval = setInterval(() => {
        console.log(16);
        wss.send("stop");
      }, 10);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          16: false,
        }));
      }, 100);
    }
    if (keyState[37] && inputSwitch[37] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        37: true,
      }));
      const interval = setInterval(() => {
        console.log("left");
        wss.send(37);
      }, 10);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          37: false,
        }));
      }, 100);
    }
    if (keyState[38] && inputSwitch[38] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        38: true,
      }));
      const interval = setInterval(() => {
        console.log("up");
        wss.send(38);
      }, 10);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          38: false,
        }));
      }, 100);
    }
    if (keyState[39] && inputSwitch[39] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        39: true,
      }));
      const interval = setInterval(() => {
        console.log("right");
        wss.send(39);
      }, 10);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          39: false,
        }));
      }, 100);
    }
    if (keyState[40] && inputSwitch[40] === false) {
      setInputSwitch((prevState) => ({
        ...prevState,
        40: true,
      }));
      const interval = setInterval(() => {
        console.log("down");
        wss.send(40);
      }, 10);
      setTimeout(() => {
        clearInterval(interval);
        setInputSwitch((prevState) => ({
          ...prevState,
          40: false,
        }));
      }, 100);
    }
  }, [keyState]);

  // const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const chatRef = useRef(null);

  const imgRef = useRef(null);

  // const onChange = (event) => setChat(event.target.value);
  // const onSubmit = (event) => {
  //   // preve;
  //   event.preventDefault();
  //   if (chat === "") return;
  //   const newChat = `${user.nickname} : ${chat}`;
  //   setChats((currentArray) => [...currentArray, newChat]);
  //   setChat("");
  // };

  // const handleKeyPress = (e) => {
  //   e.preventDefault();
  //   if (e.key === "c") {
  //     console.log("haha");
  //   }
  // };

  // useEffect(() => {
  //   imgRef.current.focus();
  // }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 950,
      }}
      tabIndex={0}
      ref={imgRef}
    >
      <Box
        sx={{
          width: "80%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "7%",
            display: "flex",
            border: "solid 2px #E8E8E8",
            marginBottom: "30px",
          }}
        >
          <Box
            sx={{
              width: "75%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "95%",
                height: "90%",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    width: "45%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h2>A {ParticipantA}</h2>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "orange",
                    }}
                  >
                    <h2>랭킹 2위</h2>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "10%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h2>vs</h2>
                </Box>
                <Box
                  sx={{
                    width: "45%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "70%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h2>B {ParticipantB}</h2>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "orange",
                    }}
                  >
                    <h2>랭킹 3위</h2>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "25%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderLeft: "solid 2px #E8E8E8",
            }}
          >
            <Box
              sx={{
                width: "95%",
                height: "90%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3>배팅현황</h3>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "40%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "90%",
                    height: "90%",
                    display: "flex",
                    border: "solid 2px #E8E8E8",
                  }}
                >
                  <Box
                    sx={{
                      width: "50%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRight: "solid 2px #E8E8E8",
                    }}
                  >
                    A 25명
                  </Box>
                  <Box
                    sx={{
                      width: "50%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    B 17명
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Paper
          elevation={3}
          sx={{
            width: "1003px",
            height: "753px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            elevation={3}
            sx={{
              width: "90%",
              height: "90%",
              position: "relative",
              bgcolor: "black",
            }}
          >
            <Box
              component="img"
              alt="RectangleRacetime"
              src={RectangleRace}
              sx={{
                width: "25%",
                height: "13%",
                opacity: "92%",
                top: "3%",
                position: "absolute",
                zIndex: 1,
              }}
            />

            <Box
              component="h4"
              sx={{
                width: "25%",
                height: "13%",
                top: "2%",
                left: "7.5%",
                color: "white",
                position: "absolute",
                zIndex: 1,
              }}
            >
              RACE TIME
            </Box>
            <Box
              component="img"
              alt="RectangleBest"
              src={RectangleBest}
              sx={{
                width: "20%",
                height: "9%",
                opacity: "85%",
                top: "20%",
                position: "absolute",
                zIndex: 1,
              }}
            />
            <Box
              // component="h5"
              sx={{
                width: "20%",
                height: "9%",
                top: "14%",
                left: "7.5%",
                color: "white",
                position: "absolute",
                zIndex: 1,
              }}
            >
              <h3>BEST</h3>
            </Box>
            <Box
              component="img"
              alt="rhombusLap"
              src={rhombusLap}
              sx={{
                width: "17%",
                height: "13%",
                top: "3%",
                right: "0",
                opacity: "50%",
                position: "absolute",
                zIndex: 1,
              }}
            />
            <Box
              component="h4"
              sx={{
                color: "white",
                position: "absolute",
                top: "1%",
                right: "7%",
                zIndex: 1,
              }}
            >
              LAP
            </Box>
            <Box
              component="img"
              alt="rhombusPlace"
              src={rhombusPlace}
              sx={{
                width: "20%",
                height: "11%",
                top: "17%",
                right: "0",
                opacity: "50%",
                position: "absolute",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
              }}
            />
            <Box
              component="h4"
              sx={{
                top: "15%",
                right: "7%",
                color: "white",
                position: "absolute",
                zIndex: 1,
              }}
            >
              PLACE
            </Box>

            <Box
              sx={{
                width: "25%",
                height: "50%",
                bottom: "0",
                position: "absolute",
                bgcolor: "black",
                color: "white",
                opacity: "0.5",
                zIndex: 1,
              }}
            >
              <Box
                id="chat"
                sx={{
                  width: "100%",
                  height: "87%",
                  // maxHeight: 500,
                  overflow: "auto",
                }}
                ref={chatRef}
              >
                <ul style={{ listStyleType: "none" }}>
                  {chats.map((item) => (
                    <li key={item.id}>{item}</li>
                  ))}
                </ul>
              </Box>
              <Box
                display="flex"
                sx={{
                  height: "10%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <form
                  onSubmit={sendChat}
                  style={{
                    display: "flex",
                  }}
                >
                  <input
                    // onChange={onChange}
                    // value={chat}
                    ref={text}
                    style={{
                      width: "100%",
                      padding: "10px 30px",
                    }}
                    type="text"
                    placeholder="채팅을 입력하세요"
                  />
                  <button
                    type="submit"
                    style={{
                      padding: "10px",
                      width: "80px",
                    }}
                  >
                    <SendIcon
                      sx={{
                        width: "50px",
                      }}
                    />
                  </button>
                </form>
              </Box>
            </Box>

            {/* <div onKeyDown={handleKeyPress}> */}
            {isTutorial && (
              <Box
                component="img"
                alt="tutorial"
                src={tutorial}
                sx={{
                  width: "40%",
                  height: "50%",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  opacity: "60%",
                  zIndex: 1,
                }}
              />
            )}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                // top: "0%",
                // left: "0%",
                bottom: "10px",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      zIndex: 1,
                      width: "30%",
                      height: "50%",
                    }}
                    component="img"
                    alt="slide"
                    src={images[currentImage]}
                  />
                </Box>
                <div>
                  <video
                    ref={video}
                    id="video"
                    autoPlay
                    width="100%"
                    height="100%"
                    poster={WebRtcImg}
                  />
                </div>
              </Box>
            </Box>
          </Box>
        </Paper>

        <Box
          sx={{
            width: "100%",
            height: "10%",
            // bgcolor: "orange",
            borderTop: "solid 1px #E8E8E8",
            marginTop: "30px",
          }}
        />
      </Box>
    </Box>
  );
}

// export { handleKeyPress };
export default PlayPage;
