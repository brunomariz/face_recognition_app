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
      enable: false,
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
      input: "https://picsum.photos/200",
      image_url: "",
      box: {},
      show_box: false,
    };
  }

  calculate_face_location = (data) => {
    const clarifai_face =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      left_col: clarifai_face.left_col * width,
      top_row: clarifai_face.top_row * height,
      right_col: width - clarifai_face.right_col * width,
      bottom_row: height - clarifai_face.bottom_row * height,
    };
  };

  display_face_box = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  on_input_change = (event) => {
    this.setState({ input: event.target.value, show_box: false });
  };

  on_submit = () => {
    this.setState({ image_url: this.state.input });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        // THE JPG
        this.state.input
      )
      .then((response) =>
        this.display_face_box(this.calculate_face_location(response))
      )
      .then(this.setState({ show_box: true }))
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
        <div className='center'>
          <div className='glass-box shadow-2 pa3 ma3'>
            <ImageLinkForm
              on_input_change={this.on_input_change}
              on_button_submit={this.on_submit}
            ></ImageLinkForm>
            {/* CHANGED */}
            <FaceRecognition
              box={this.state.box}
              link={this.state.input}
              show_box={this.state.show_box}
            ></FaceRecognition>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
