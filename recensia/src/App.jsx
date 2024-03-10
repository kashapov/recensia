import React, {useState} from 'react';
import './App.css'
import {Card, Empty, Input, List, Space, Spin, Typography} from "antd";
import axios from "axios";

const { Search } = Input;
const { Paragraph, Text } = Typography;

function App() {
  // const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
  // const [loading, setLoading] = useState(false);
  //
  // const onSearch = (value) => {
  //   setSearchQuery(value);
  //   setLoading(true);
  //   // Make an API request to fetch search results
  //   // https://apps.apple.com/ua/app/pixelmator-pro/id1289583905?mt=12
  //     axios.get(`https://recensia-2fd235ed82fc.herokuapp.com/analyse/raw/?app_store_url=${value}`)
  //     .then(response => {
  //       setSearchResults(response.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching search results:', error);
  //       setLoading(false);
  //     });
  // };

  // const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [webSocket, setWebSocket] = useState(null);
  //
  // // Function to handle WebSocket messages
  // const handleWebSocketMessage = (event) => {
  //   console.log('Received WebSocket message:', event.data);
  //   // Handle incoming WebSocket messages here
  // };
  //
  // // Function to handle WebSocket errors
  // const handleWebSocketError = (error) => {
  //   console.error('WebSocket error:', error);
  //   // Handle WebSocket errors here
  // };
  //
  // const onSearch = (value) => {
  //   setSearchQuery(value);
  //   setLoading(true);
  //
  //   // Initialize WebSocket connection
  //   const socket = new WebSocket('wss://recensia-2fd235ed82fc.herokuapp.com/analyse/ws/');
  //   socket.addEventListener('open', () => {
  //     console.log('WebSocket connection opened');
  //     setWebSocket(socket);
  //     // Send search query to WebSocket server
  //     socket.send(value);
  //   });
  //   socket.addEventListener('message', handleWebSocketMessage);
  //   socket.addEventListener('error', handleWebSocketError);
  //
  //   // Clean up WebSocket connection on component unmount
  //   return () => {
  //     if (socket) {
  //       socket.close();
  //     }
  //   };
  // };

  // const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [webSocket, setWebSocket] = useState(null);
  //
  // const handleWebSocketMessage = (event) => {
  //   console.log('Received WebSocket message:', event.data);
  //   setSearchResults(prevResults => [...prevResults, event.data]); // Update searchResults with received message
  // };
  //
  // const handleWebSocketError = (error) => {
  //   console.error('WebSocket error:', error);
  // };
  //
  // const onSearch = (value) => {
  //   setSearchQuery(value);
  //   // setLoading(true);
  //
  //   const socket = new WebSocket('wss://recensia-2fd235ed82fc.herokuapp.com/analyse/ws/');
  //   socket.addEventListener('open', () => {
  //     console.log('WebSocket connection opened');
  //     setWebSocket(socket);
  //     socket.send(value);
  //   });
  //   socket.addEventListener('message', handleWebSocketMessage);
  //   socket.addEventListener('error', handleWebSocketError);
  //
  //   return () => {
  //     if (socket) {
  //       socket.close();
  //     }
  //   };
  // };
  ///////
  const [title, setTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [loading, setLoading] = useState(false);
  const [webSocket, setWebSocket] = useState(null);
  let i = 0;
  const handleWebSocketMessage = (event) => {
    setLoading(false);
    if (i === 0) {
      setTitle(event.data)
    } else {
      setSearchResults(prevResults => prevResults + '' + event.data); // Concatenate received word to existing results
    }
    i++;
    // console.log('Received WebSocket message:', event.data);
  };

  const handleWebSocketError = (error) => {
    console.error('WebSocket error:', error);
  };

  const onSearch = (value) => {
    setSearchResults('');
    setSearchQuery(value);
    setLoading(true);

    const socket = new WebSocket('wss://recensia-2fd235ed82fc.herokuapp.com/analyse/ws/');
    socket.addEventListener('open', () => {
      console.log('WebSocket connection opened');
      setWebSocket(socket);
      socket.send(value);
    });
    socket.addEventListener('message', handleWebSocketMessage);
    socket.addEventListener('error', handleWebSocketError);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  };


  return (
    <Space size={16} direction={"vertical"} className="app-container">
      <h1>Recensia</h1>
      <Text code copyable={{ text: 'https://apps.apple.com/ua/app/microsoft-word/id462054704?mt=12' }}>Example: https://apps.apple.com/ua/app/microsoft-word/id462054704?mt=12</Text>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 600 }}
        size="large"
      />
      {/*{loading ? (*/}
      {/*  <Spin size="large" />*/}
      {/*) : (*/}
        <Card title={title} style={{ width: '800px', textAlign: 'left' }}>
          <pre style={{margin: 0, whiteSpace: 'pre-wrap', fontSize: 'medium' }}>{loading ? <Spin style={{ width: '100%' }} size="large" /> : !searchResults ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : searchResults}</pre>
          {/*<List*/}
          {/*  dataSource={searchResults}*/}
          {/*  renderItem={item => (*/}
          {/*    <List.Item>{item}</List.Item>*/}
          {/*  )}*/}
          {/*/>*/}
        </Card>
      {/*)}*/}
    </Space>
  );
}

export default App;
