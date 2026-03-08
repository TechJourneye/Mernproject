import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import './App.css'
import Navbar from '../component/navbar'
import ProtectedRoute from './ProtectedRoute'
import AllListing from '../component/listing'
import ShowListing from '../component/listing/showListing'
import CreateListing from '../component/listing/create'
import EditListing from '../component/listing/edit'
import FlashMSG from '../component/includes/flashMSG'
import Signup from "../component/user/signup";
import './index.css'
import './css/footer.css'
import './css/index.css'
import './css/rating.css'
import Login from "../component/user/login";
import Footer from "../component/includes/footer";
import SearchResults from "../component/search/SearchResults";
function App() {

  return(
  
  <CookiesProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          
          <Navbar />

          <ToastContainer 
            position="top-center" 
            autoClose={2000} 
            style={{ marginTop: "70px" }} 
          />

          <div className="main-content">
            <Routes>
              <Route path="/" element={<AllListing />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path='/search' element={<SearchResults/>}/>
              <Route path="/listing/new" element={<ProtectedRoute><CreateListing/></ProtectedRoute>} />
              <Route path="/listing/:id" element={<ShowListing />} />
              <Route path="/listing/:id/edit" element={<ProtectedRoute><EditListing/></ProtectedRoute>} />
            </Routes>
          </div>

          <Footer />

        </div>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;