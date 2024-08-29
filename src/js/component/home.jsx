import React from "react";
import Tasks from "./tasks.jsx";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="app">
			<Tasks />
		</div>
	);
};

export default Home;
