import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { HomeScreen } from "./Screens/HomeScreen";
import { LoginScreen } from "./Screens/LoginScreen";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { ProductScreen } from "./Screens/ProductScreen";
import { RegisterScreen } from "./Screens/RegisterScreen";
import { Cart } from "./Screens/Cart";
import { ProfileScreen } from "./Screens/profileScreen";
import { Address } from "./Screens/Address";
import { PaymentScreen } from "./Screens/paypal";
import { PlaceOrder } from "./Screens/placeorder";
import { OrderScreen } from "./Screens/Order";
import { UserListScreen } from "./Screens/UserList";
import { AdminUserEditScreen } from "./Screens/adminuserEdit";
import { ProductListScreen } from "./Screens/Products";
import { ProductEditScreen } from "./Screens/productEdit";
import OrderListScreen from "./Screens/orderList";
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Route path="/" component={HomeScreen} exact />

        <Route path="/products/:id" component={ProductScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/cart/:id?" component={Cart} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/shipping" component={Address} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrder} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/admin/users" component={UserListScreen} />
        <Route path="/admin/user/:id/edit" component={AdminUserEditScreen} />
        <Route path="/admin/productlist" component={ProductListScreen} exact />
        <Route
          path="/admin/productlist/:pageNumber"
          component={ProductListScreen}
          exact
        />
        <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
        <Route path="/admin/orderlist" component={OrderListScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
