import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import ToggleTheme from "./ToggleTheme";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext()

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div>
        <Link to="/">
          <h1>SHARIFY</h1>
        </Link>
      </div>
      <div>
        {user && <span>{user.username}</span>}
        <button onClick={handleClick}>log out</button>
      </div>
      <ToggleTheme />
    </header>
  );
};

export default Header;
