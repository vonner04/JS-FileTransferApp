import axios from 'axios';
import Navigation from './components/navigation-bar/Navigation';

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
    <>
      <div className='flex'>
        {/*sidebar*/}
        <Navigation />
        {/*main content*/}
      </div>
    </>
  )
}

export default App
