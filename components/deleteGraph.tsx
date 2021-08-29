import { useMutation } from "@apollo/client";
import React from "react";

import { DELETE_GRAPH } from "./graphql/mutation";

const DeleteGraphProps = ({ id, show, setShow }) => {
  const [deleteGraph] = useMutation(DELETE_GRAPH, {
    onCompleted() {
      location.href = "/";
      console.log("削除");
    },
  });
  if (show) {
    return (
      <div id="overlay_delete">
        <div id="content_delete" >
          <p>本当に削除しますか？</p>
          <div className="flex">
            <div className="final_delete">
              <button
                className="button veri_delete"
                onClick={() => {
                  deleteGraph({
                    variables: { id },
                  });
                }}
              >
                はい
              </button>
            </div>
            <div>
              <button onClick={() => setShow(false)} className="button">
                いいえ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default DeleteGraphProps;
