import React, { useState } from "react";
// tasks left: 
//x only on hover
//enter to add to list
//number total items on list
//style

	 

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
	return (
	<>
		<div className="text-center">
			<input type="text" onChange= {(e)=> setTask(e.target.value)} />
			<button onClick= {()=> setList([...list, [task]])}>Add to list</button>
		</div>
		<div className="text-center">
			<ul className="list-inline">
				{list.map((entry,index) =>
					{return <li key={index} className="bg-light"> {entry}
					<button onClick= {()=> removeTask(index)} className="ms-3 btn text-center badge rounded-pill bg-secondary">X</button>
					</li>}
					)
				}
			</ul>
		</div>
		
		</>
	);
};

export default Home;
