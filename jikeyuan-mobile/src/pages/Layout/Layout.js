import React from 'react'
import TabBarComp from "../../components/TabBarComp";
import "./index.less"

function Layout(props) {
    return (
        <>
            <div className="layout">
                <div className="layout-tabbar">
                    <TabBarComp/>
                </div>
            </div>
        </>
    );
}

export default Layout;