import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatlog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) =>{
    event.preventDefault();

    // Add user's message to chat log
    setChatlog((prevChatLog) => [...prevChatLog, {type: 'user', message:inputValue}]);


    // Send user's message to the chatbot
    sendMessage(inputValue);

    // Clear input value
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

    axios.post(URL,data, {headers:headers}).then((response) => {
      console.log(response);

      // Add bot's response to chat log
      setChatlog((prevChatLog) => [...prevChatLog, { type:'bot', message:response.data.choices[0].message.content }])
      setIsLoading(false)
    }).catch((error) =>{
        setIsLoading(false)
        console.log(error)
      });

  }
  return (
    <>
      <div>
        <div className='flex-grow p-6'></div>
        <div className='flex flex-col space-y-4'></div>
      </div>
      {
        chatLog.map((message, index) => (
          <div key={index} className={`flex ${
            message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}>
            <div className={`${
              message.type === 'user' ? 'bg-white-500' : 'bg-gray-800'
            } rounded-lg p-4 text-black max-w-sm`}>
            {message.message}
            </div>
            </div>
        ))}
      <form class="wrapper" onSubmit={handleSubmit}> 
        <h1>Brand-assi</h1>
        <p>tell me what your brand is about and <br></br>I'll generate keywords for you</p>
        <input placeholder="cat kits" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/><br></br>
        <button>send</button>
      </form>
    </>
    
  );
}

export default App;
