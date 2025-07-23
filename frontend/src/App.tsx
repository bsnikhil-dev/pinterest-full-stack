import './App.css'
import Gallery from './components/gallery/Gallery'
import SideBar from './components/sideBar/SideBar'
import TopBar from './components/topBar/TopBar'

function App() {

  return (
    <div className='app'>
      <SideBar />
      <div className="content">
        <TopBar />
        <Gallery />
      </div>
    </div>



  )
}

export default App
