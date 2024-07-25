import JoinChatForm from './components/JoinChatForm/JoinChatForm';
import ChatWindow from './components/ChatWindow/ChatWindow';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

//Initializing the connection
const socket = io("http://localhost:3003");

function App() {

  const [isInRoom, setIsInRoom] = useState(false);
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Socket connection has been established")
    });

    return () => {
      socket.off("connect")
    }


  }, []);

  const handleJoinRoom = (info) => {
    socket.emit("user_join_room", info);
    setIsInRoom(true);
  };

  return (
    <div>
      {isInRoom ? <ChatWindow username={username} roomId={roomId} socket={socket} /> : <JoinChatForm onJoin={handleJoinRoom} setUsername={setUsername} setRoomId={setRoomId} username={username} roomId={roomId} />}
    </div>
  );
}

export default App;
