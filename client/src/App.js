import React from 'react';
import './App.css'; 
import { socket, SocketContext } from './context/socket';

function App() {
	return (
		<SocketContext.Provider  value={socket}> 
			<div className="container"> 
			</div>
      <p>hello world</p>
		</SocketContext.Provider>
	);
}

export default App;