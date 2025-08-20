// App.js
import { BrowserRouter } from 'react-router-dom';
import Routers from './routers';
import Header from '@components/Header.jsx';
import Footer from '@components/Footer.jsx';

function App() {
    return (
        <BrowserRouter>
            <Header />
                <Routers />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
