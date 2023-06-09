import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [botMessage, setBotMessage] = useState('');

  const handleSubmit = (event) =>{
    event.preventDefault();

    // Add user's message to chat log
    setChatLog((prevChatLog) => [...prevChatLog, {type: 'user', message:inputValue}]);


    // Send user's message to the chatbot
    sendMessage(inputValue);

    // Clear input value
    setInputValue('');

  };
  const sendMessage = (message) =>{
    const URL = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${process.env.REACT_PUBLIC_OPENAI_API_KEY}'
    };
    const data = {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": message}]
    }
    setIsLoading(true);

    axios.post(URL,data, {headers:headers}).then((response) => {
      console.log(response);
      // Set bot's response
    setBotMessage(response.data.choices[0].message.content);

      // Add bot's response to chat log
      setChatLog((prevChatLog) => [...prevChatLog, { type:'bot', message:response.data.choices[0].message.content }])
      setIsLoading(false)
      setInputValue(''); // Clear the input field
    }).catch((error) =>{
        setIsLoading(false)
        console.log(error)
      });

  }
  return (
  <div className='container flex'>
    <div className="border border-solid border-2 w-[400px] h-screen  bg-gradient-to-b from-pink-300 to-teal-600-opacity-80 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
      <h1>Chat History</h1>
    </div>
    <div className='container ml-20 mt-30 p-10'>
      <h1 className='text-xl font-bold text-center'>Your Brand Assistant</h1><br></br>
      <p className='text-center'>tell me a little bit about your brand</p>
      <div className='flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-2">Keywords</h2>
          <p className="text-gray-600">'give me keywords for my brand catkits'.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-2">SEO</h2>
          <p className="text-gray-600">'how to optimize my website</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-2">Marketing strategies</h2>
          <p className="text-gray-600">generate steps to improve leads</p>
      </div>
        
    </div>
    <>
      {chatLog.map((message, index) => {
        <p key={index}>{message.type}: {message.message}</p>
      })}
    </>
      <form className='flex pt-10' onSubmit={handleSubmit}>
        <input placeholder='type your message'className='border boader-gray-solid-1-boader-r-none w-[100%] h-20 '  onChange={(event) => setInputValue(event.target.value)}/>
        
        <button className='h-20 bg-gradient-to-b from-pink-200 to-pink-1000-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-lg' type='submit'>send</button><br/>
        
      </form>
      <textarea
          className='border border-solid border-gray-300 w-[100%] h-40 mt-4'
          value={botMessage}
          readOnly
        />
      </div>
    
  </div>
  )
}

export default App;
