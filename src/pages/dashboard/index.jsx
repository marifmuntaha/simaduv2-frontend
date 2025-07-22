import React from "react";
import {APICore} from "../../utils/api/APICore";
import Administrator from "./administrator";

const Dashboard = () => {
    const api = new APICore()
    const user = api.getLoggedInUser()
    switch (user.role) {
        case "1":
            return <Administrator/>;
        default:
            return (
                <React.Fragment>
                    Halaman Default
                </React.Fragment>
            )
    }
}

export default Dashboard;