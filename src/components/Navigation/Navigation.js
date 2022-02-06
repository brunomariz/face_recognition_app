import React from "react";

const Navigation = ({ on_route_change, is_signed_in }) => {
  if (is_signed_in) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => on_route_change("signout")}
          className='f3 link grow black underline pa3 pointer'
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => on_route_change("signin")}
          className='f3 link grow black underline pa3 pointer'
        >
          Sign In
        </p>
        <p
          onClick={() => on_route_change("register")}
          className='f3 link grow black underline pa3 pointer'
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
