import { Link } from "react-router";
import "./home.css"; 

export default function Index() {
  return (
    <div className="home-container">
      <h1 className="home-title">Mindfulness Companion</h1>
      <p className="home-subtitle">
        A simple space to reflect, breathe, and grow.
      </p>

      <Link to="journal" className="home-button">
        Start Journaling 
      </Link>
      <Link to="history" className="home-button">
        View Past Reflections
      </Link>
    </div>
  );
}
