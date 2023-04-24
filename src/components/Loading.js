import React from "react";
import { Spin } from "antd";

const Loading = () => {
    return (
        <div
        style={{
            position: "absolute",
            top: "300px",
            left: "50%",
            transform: "translateX(-50%)"
          }}
        >
            <Spin size="large" />
        </div>
    );
};

export default Loading;