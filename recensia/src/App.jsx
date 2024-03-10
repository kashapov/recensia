import React, {useState} from 'react';
import './App.css'
import {Input, List, Spin} from "antd";
import axios from "axios";

const { Search } = Input;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = (value) => {
    setSearchQuery(value);
    setLoading(true);
    // Make an API request to fetch search results
    // https://apps.apple.com/ua/app/pixelmator-pro/id1289583905?mt=12
      axios.get(`https://recensia-2fd235ed82fc.herokuapp.com/analyse/raw/?app_store_url=${value}`)
      .then(response => {
        setSearchResults(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        setLoading(false);
      });
  };

  return (
    <div className="app-container">
      <h1>Recensia</h1>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
        enterButton
      />
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          dataSource={searchResults}
          renderItem={item => (
            <List.Item>{item}</List.Item>
          )}
        />
      )}
    </div>
  );
}

export default App;
