import { Route, Routes } from "react-router"
import { Basket } from "./pages/Basket"
import { Main } from "./pages/Main"
import { Order } from "./pages/Order"
import { Product } from "./pages/Product"
import { Auth } from "./pages/Auth"
import './index.css'
import Registration from "./pages/Registration"
import { Category } from "./pages/Category"
import { Search } from "./pages/Search"
import { Header } from "./components/header/Header"
import { Footer } from "./components/footer/Footer"
import { PersonalArea } from "./pages/PersonalArea"

function App() {


  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/lk" element={<PersonalArea />} />
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
