import React from 'react';

// External Imports
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';

// Internal Imports
import Header from './components/Header';
import Footer from './components/Footer';
import { CartScreen, HomeScreen, ProductScreen, LoginScreen, ProfileScreen, RegisterScreen, ShippingScreen, PaymentScreen, PlaceOrderScreen, OrderScreen, UserListScreen, UserEditScreen, ProductListScreen, ProductEditScreen, OrderListScreen } from './screens';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} />
          <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/shipping" component={ShippingScreen} />
          <Route exact path="/payment" component={PaymentScreen} />
          <Route exact path="/placeorder" component={PlaceOrderScreen} />
          <Route exact path="/orders/:id" component={OrderScreen} />
          <Route exact path="/admin/users" component={UserListScreen} />
          <Route exact path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route exact path="/admin/products" component={ProductListScreen} />
          <Route exact path="/admin/products/:pageNumber" component={ProductListScreen} />
          <Route exact path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route exact path="/admin/orders" component={OrderListScreen} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
