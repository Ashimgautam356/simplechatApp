import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { HomePageLayout } from './layout/HomePageLayout'
import { Users } from './components/Users'



export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element ={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        
        <Route path='/homePage' element={<HomePageLayout></HomePageLayout>}>
          <Route index element={<Users></Users>}></Route>

        </Route>


      </Routes>

    </Router>
  )
}




