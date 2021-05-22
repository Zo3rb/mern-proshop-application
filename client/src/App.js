import React from 'react';

// External Imports
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';

// Internal Imports
import Header from './components/Header';
import Footer from './components/Footer';
import { CartScreen, HomeScreen, ProductScreen, LoginScreen, ProfileScreen, RegisterScreen } from './screens';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/" component={HomeScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
