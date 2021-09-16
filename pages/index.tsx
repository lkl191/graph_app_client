import React, { useState } from "react";
import AllBlendGraph from "../components/allBlendGraph";

import AllGraph from "../components/allGraph";

const App = () => {
  type GraphType = "NORMAL" | "BLEND"
  const [change, setChange] = useState<GraphType>("NORMAL")
  const changeCreateGraph = (e) => {
    setChange(e.target.name);
  };
  return (
    <div className="container">
      <br></br>
      <button 
      className="button"
      name="NORMAL"
      onClick={changeCreateGraph}
      >
        グラフ一覧
      </button>
      <button 
      className="button"
      name="BLEND"
      onClick={changeCreateGraph}
      >
        複合グラフ一覧
      </button>
      <section>
        <ul>
          {(() => {
            switch (change) {
              case "NORMAL":
                return <AllGraph />
              case "BLEND":
                return  <AllBlendGraph />
            }
          })()}
        </ul>
      </section>
    </div>
  );
};

export default App;
