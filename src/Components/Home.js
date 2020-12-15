import React from "react";
import styled from "styled-components";
import img from '/Users/teamnaumann/Desktop/Lambda/Unit 2/web-sprint-challenge-single-page-applications/src/images/patrick-tomasso-GXXYkSwndP4-unsplash.jpg';

const ImageBackground = styled.div`
  vertical-align: top;
  display: block;
  width: 100vw;
`;


const Home = () => {
  return (
    <>
      <ImageBackground>
        <h1
          style={{
            position: "fixed",
            color: "White",
            fontSize: "5rem",
            marginLeft: "33%",
            fontFamily: "arial",
            background: "#7f7f7f",
            background: "rgba(0,0,0,0.5)",
            padding: "2rem",
          }}
        >
          Cafe Lambda
        </h1>
        <img
          src={img}
          alt="cafe"
          style={{
            postion: "absolute",
            width: "100vw",
            height: "100vh",
            // opacity: "80%"
          }}
        />
      </ImageBackground>
    </>
  );
};

export default Home;
