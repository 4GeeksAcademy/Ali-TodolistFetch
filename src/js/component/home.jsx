import React from "react";
import { TodoListFetch } from "./TodolistFetch";



//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<TodoListFetch/>
		</div>
	);
};

export default Home;
