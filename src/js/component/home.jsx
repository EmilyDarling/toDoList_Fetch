import React, { useState , useEffect} from "react";	 

const Home = () => {
	
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);

	
	  const getToDos = () => {
		fetch('https://playground.4geeks.com/todo/users/Angelina_Renfroe')
		.then(response => {
			if (!response.ok) {
				throw Error(response.statusText);
				//if no profile create it first
			}
			return response.json();
		})

		.then(responseAsJson => {
			console.log(responseAsJson);
			setList(responseAsJson.todos);				
		})

		.catch(error => {
			console.log('Looks like there was a problem: \n', error);
		});
	  };

		const update =() =>
		{
			fetch('https://playground.4geeks.com/todo/users/Angelina_Renfroe', {
		method: "PUT",
		body: JSON.stringify(todos),
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
	}

	  const addToDo = () => {
		fetch('https://playground.4geeks.com/todo/todos/Angelina_Renfroe', {

			method: 'POST',
			body:JSON.stringify({
					'label': task,
					'is_done': false
				  }), // data can be a 'string' or an {object} which comes from somewhere further above in our application		  
			headers: {		  
			  'Content-Type': 'application/json'		  
			}		  
		  })
		  
			.then(res => {		  
			  if (!res.ok) throw Error(res.statusText);		  
			  return res.json();		  
			})		  
			.then(res => {
				console.log('Success:', res)	
				getToDos();
				
			
			})	  
			.catch(error => console.error(error));
	  };
	  
	const deleteToDo = (ind) => {
		var id = ind.id;
		
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
		headers:{
			"Content-Type" : "application/json"
		},
		})
		
		.then((res) => {		  
			if (!res.ok) {throw Error(res.statusText);}		  
			getToDos();
			return 
				res.json();	
					  
		  })		  
		  .then(res => {
			  console.log('Successssss:', res);0	
			  
			  
		  
		  })	  
		  .catch(error => console.error(error));
	}
		


			function enterFunc(event) {
				let mykey = event.key;
				if (mykey == "Enter") { 
					addToDo();
				}
			}

	  useEffect(() => {
		getToDos();	
	}, []); //end of useEffect for on load

	return (
	<div className="mt-5">
		<h2 className="text-center ">My Todos</h2>
		<div className="inputLine text-center mb-2">
			<input className="bg-light border border-light" id="taskInput" type="text" 
			onChange= {(e)=> setTask(e.target.value)}  onKeyDown={(Event)=> enterFunc(Event)} placeholder="What do you need to do?"/>
			
		</div>
		<div className="text-center">
			<ul className="text-center p-0" >
				{list.map((entry,index) =>
					{return <li key={index} className="bg-light border border-secondary"> {entry.label}
					<button onClick= {()=> deleteToDo(entry)} className="ms-3 btn text-center badge rounded-pill bg-secondary xBtn">X</button>
					</li>}
					)
				}
				<span>
					<li>{list.length} items left</li>
					<button onClick= {()=> 
						{list.map((entry,index) =>
							 deleteToDo(entry)
							)
						}
					} className="ms-3 btn text-center badge rounded-pill bg-primary ">Delete all tasks</button>
				</span>
			</ul>
		</div>
		
	</div>
	);
};




export default Home;
