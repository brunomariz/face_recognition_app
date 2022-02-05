import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-tsparticles";
import React, { Component } from "react";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "43d138007659406db4d72ee94fb98bd0",
});

const particles_options = {
  background: {},
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "grab",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 5,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 130,
      enable: true,
      opacity: 0.5,
      width: 2,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 120,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      image_url: "",
    };
  }

  on_input_change = (event) => {
    this.setState({ input: event.target.value });
  };

  on_submit = () => {
    this.setState({ image_url: this.state.input });
    console.log(this.state.input);
    app.models
      .predict(
        Clarifai.COLOR_MODEL,
        // THE JPG
        this.state.input
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className='App'>
        <Particles
          className='particles'
          id='tsparticles'
          options={particles_options}
        />
        <Navigation></Navigation>
        <Logo></Logo>
        <Rank></Rank>
        <ImageLinkForm
          on_input_change={this.on_input_change}
          on_button_submit={this.on_submit}
        ></ImageLinkForm>
        <FaceRecognition link={this.state.image_url}></FaceRecognition>
      </div>
    );
  }
}

export default App;
