import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div>
      <h1>You are unauthorized...</h1>
      <Link to="/">Home</Link>
    </div>
  );
}