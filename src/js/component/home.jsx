import React from "react";
import {TaskList} from "./tasks.jsx";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="app">
			<TaskList />
		</div>
	);
};

export default Home;
