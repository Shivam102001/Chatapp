import { Link } from 'react-router-dom';
import backgroundImg from '../assets/background.jpeg';

function Forgotpassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your password reset logic here
    alert('Password reset functionality will be implemented.');
  };

  const handleOnChange = (e) => {
    // Implement your onChange logic here if needed
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mx-auto -mt-14">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Forgot Password</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-gray-100 border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={handleOnChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white text-lg font-bold py-2 rounded hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Remember your password? <Link to="/login" className="text-primary hover:underline font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Forgotpassword;
