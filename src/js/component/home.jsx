import React from "react";
import AddTodo from "./tasks.jsx";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="app">
			<AddTodo />
		</div>
	);
};

export default Home;
