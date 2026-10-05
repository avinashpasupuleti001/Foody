import { useState } from "react";
import { Link } from "react-router-dom";
function Header() {
  const [val,setVal] = useState("Login");
  return (
        <header className="App-header"> 
        <img className="applogo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_fn0nfscpYSebtmmg0Mk3EJmfNYn11eeymqXYuaE9sVU2LXaWBZMem0c&s=10" alt="logo" />
         <ul className="nav-items">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>   
        <li><Link to='/gocery'>Gocery</Link></li>
        <li>cart </li>
        <button className="login-btn" onClick={() => {
          if(val === "Login") {
            setVal("Logout");
          } else {
            setVal("Login");
          }
        }}>{val}</button>    
        </ul>
        </header>

  )
}
export default Header;