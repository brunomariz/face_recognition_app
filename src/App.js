import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Particles from "react-tsparticles";
import React, { Component } from "react";

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

const initial_state = {
  input: "https://picsum.photos/600",
  image_url: "https://picsum.photos/600",
  box: {},
  show_box: false,
  route: "signin",
  is_signed_in: false,
  user: {
    name: "",
    email: "",
    id: "",
    entries: 0,
    joined: "",
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initial_state;
  }

  load_user = (data) => {
    this.setState({
      user: {
        name: data.name,
        email: data.email,
        id: data.id,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

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
    fetch("http://localhost:3002/imageurl", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3002/image", {
            method: "put",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              console.log(count);
              this.setState({
                user: {
                  ...this.state.user,
                  entries: count,
                },
              });
            })
            .catch(console.log);
        }
        this.display_face_box(this.calculate_face_location(response));
      })
      .then(this.setState({ show_box: true }))
      .catch((err) => {
        console.log(err);
      });
  };

  on_route_change = (route) => {
    this.setState({ route: route });
    if (route == "signout") {
      this.setState(initial_state);
    } else if (route == "home") {
      this.setState({ is_signed_in: true });
    }
  };

  render() {
    return (
      <div className='App'>
        <Particles
          className='particles'
          id='tsparticles'
          options={particles_options}
        />
        <Navigation
          is_signed_in={this.state.is_signed_in}
          on_route_change={this.on_route_change}
        ></Navigation>
        {this.state.route == "home" ? (
          <div>
            <Logo></Logo>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            ></Rank>
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
        ) : this.state.route == "signin" || this.state.route == "signout" ? (
          <SignIn
            load_user={this.load_user}
            on_route_change={this.on_route_change}
          ></SignIn>
        ) : (
          <Register
            load_user={this.load_user}
            on_route_change={this.on_route_change}
          ></Register>
        )}
      </div>
    );
  }
}

export default App;
