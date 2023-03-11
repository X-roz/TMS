import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ShowTruck from '../components/showtruck/showtruck';
import Add from '../components/add/add'
import EntryPage from '../components/entry/entry';

const route=()=>{
    return (  
        <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<EntryPage/>} />
            <Route exact path='/show-truck' element={<ShowTruck/>} />
            <Route exact path='/add-truck' element={<Add/>} />
        </Routes>
        </BrowserRouter>
    );
}

export default route; 
