import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'; 
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetails';
import Header from './component/Header';
import Footer from './component/Footer';
import CategoryPost from './pages/CategoryPosts';

function App() {
  return (
    <div className="App">
     
      <Router>
      <Header/>
        <Routes>
          <Route path='/' element ={<PostList />}/>
        </Routes>
      
        <Footer/>
      </Router>
      
     
    </div>
  );
}

export default App;
