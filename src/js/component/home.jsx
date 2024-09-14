import React, { useState , useEffect} from "react";	 

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
			addToDo(task);
			getToDos();		
		}
	  }


	  const getToDos = () => {
		fetch('https://playground.4geeks.com/todo/users/Angelina_Renfroe')
		.then(response => {
			if (!response.ok) {
				throw Error(response.statusText);
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

	  const addToDo = (task) => {
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
			.then(response => console.log('Success:', response))		  
			.catch(error => console.error(error));
	  };
	  
	const deleteToDo = () => {
		fetch('https://playground.4geeks.com/todo/todos/Angelina_Renfroe', {
        method: 'DELETE',
		});
		if (response.ok) {
			const data =  response.json();
			return data;

		} else {
			console.log('error: ', response.status, response.statusText);
			/* Handle the error returned by the HTTP request */
			return {error: {status: response.status, statusText: response.statusText}};
		};

	}

	  useEffect(() => {
		getToDos();	
	}, []); //end of useEffect for on load

	return (
	<div className="mt-5">
		<h2 className="text-center ">My Todos</h2>
		<div className="inputLine text-center mb-2">
			<input className="bg-light border border-light" id="taskInput" type="text" 
			onChange= {(e)=> setTask(e.target.value)}  
			onKeyDown={(Event)=> enterFunc(Event)} placeholder="What do you need to do?"/>
			
		</div>
		<div className="text-center">
			<ul className="text-center p-0" >
				{list.map((entry,index) =>
					{return <li key={index} className="bg-light border border-secondary"> {entry.label}
					<button onClick= {()=> removeTask(index)} className="ms-3 btn text-center badge rounded-pill bg-secondary xBtn">X</button>
					</li>}
					)
				}
				<li>{list.length} items left</li>
			</ul>
		</div>
		
	</div>
	);
};




export default Home;
