import React, { useState } from "react";


	 

const Home = () => {
	
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);

	function removeTask(index) {
		var newList = [];
		list.forEach(e => {
			if(e !== list[index])
			{newList =([...newList, e]);
				console.log(newList);
			}
		});
		 
		 setList (newList);
	}

	function enterFunc(event) {
		let mykey = event.key;
		if (mykey == "Enter") { 
			setList([...list, [task]]);
		}
	  }


	fetch('https://playground.4geeks.com/todo/todos/Angelina_Renfroe', {

		method: "PUT",
	
		body: JSON.stringify(list),
	
		headers: {
	
		  "Content-Type": "application/json"
	
		}
	
	  })
	
	  .then(resp => {
	
		  console.log(resp.ok); // Will be true if the response is successful
	
		  console.log(resp.status); // The status code=200 or code=400 etc.
	
		  console.log(resp.text()); // Will try to return the exact result as a string
	
		  return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
	
	  })
	
	  .then(data => {
	
		  // Here is where your code should start after the fetch finishes
	
		  console.log(data); // This will print on the console the exact object received from the server
	
	  })
	
	  .catch(error => {
	
		  // Error handling
	
		  console.error(error);
	
	  });

	return (
	<body className="mt-5">
		<h2 className="text-center ">My Todos</h2>
		<div className="inputLine text-center mb-2">
			<input className="bg-light border border-light" id="taskInput" type="text" onChange= {(e)=> setTask(e.target.value)}  onKeyDown={(Event)=> enterFunc(Event)} placeholder="What do you need to do?"/>
			
		</div>
		<div className="text-center">
			<ul className="text-center p-0" >
				{list.map((entry,index) =>
					{return <li key={index} className="bg-light border border-secondary"> {entry}
					<button onClick= {()=> removeTask(index)} className="ms-3 btn text-center badge rounded-pill bg-secondary xBtn">X</button>
					</li>}
					)
				}
				<li>{list.length} items left</li>
			</ul>
		</div>
		
		</body>
	);
};




export default Home;
