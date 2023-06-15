import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatlog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) =>{
    event.preventDefault();

    setChatlog((prevChatLog) => [...prevChatLog, {type: 'user', message:inputValue}]);
    setInputValue('');

  };
  const sendMessage = (message) =>{
    const URL = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $(process.env.REACT_PUBLIC_OPENAI_API_KEY)'
    };
    const data = {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": message}]
    }
    setIsLoading(true);

    axios.post(url,data, {headers:headers}).then((response) => {
      console.log(response);
      setChatlog((prevChatLog) => [...prevChatLog, { type:'bot', message:response.data.choices[0].message.content }]
      setIsLoading(false))
    }).catch((error) =>{
        setIsLoading(false)
        console.log(error)
      });

  }
  return (
    <>
      {
        chatLog.map((message, index) => {
          <div key='index'>message.message</div>

        })
      }
      <form class="wrapper" onSubmit={handleSubmit}> 
        <h1>Brand-assi</h1>
        <p>tell me what your brand is about and <br></br>I'll generate keywords for you</p>
        <input placeholder="cat kits"/><br></br>
        <button>send</button>
      </form>
    </>
    
  );
}

export default App;
