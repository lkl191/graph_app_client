import React from "react";

import AllGraph from "../components/allGraph";

const App = () => {
  //const [user] = useAuthState(Auth)
  return (
    <>
      <div className="container">
        <br></br>
        <section>
          <ul>
            <AllGraph />
          </ul>
        </section>
      </div>
    </>
  );
};

export default App;
