import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddClientModal from './components/AddClientModal'
import Clients from './components/Clients'
import Header from './components/Header'
import Home from './pages/Home'
import Project from './pages/Project'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
