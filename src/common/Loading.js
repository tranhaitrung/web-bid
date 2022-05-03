import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

function Loading() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingOutlined />
    </div>
  );
}

export default Loading;