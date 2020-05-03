import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='mainHeading'>MERN Chat</h1>
        <h1 className='heading'>Join </h1>
        <div>
          <input
            type='text'
            placeholder='Enter Name'
            className='joinInput'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Enter Room'
            className='joinInput mt-20'
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link onClick={(e) => (!name || !room ? e.preventDefault() : null)} to={`/chat?name=${name}&room=${room}`}>
          <button className='button' type='submit'>
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Chat;
