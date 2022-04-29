import React from 'react';
import {Spin} from "antd";
import "./index.css"

function Loading(props) {
    return (
        <div className="example">
            <Spin tip={"Loading"} />
        </div>
    );
}

export default Loading;