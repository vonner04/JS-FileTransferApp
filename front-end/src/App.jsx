import axios from 'axios';
import './App.css';

const apiCall = () => {
  axios.get('http://localhost:3000')
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error)
  })
}

function App() {

  return (
   <div className="App">
    <button onClick={apiCall}>Click Me</button>
   </div>
  )
}

export default App
