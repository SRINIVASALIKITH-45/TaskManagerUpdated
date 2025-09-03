import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import AuthForm from "./components/AuthForm";
import "./styles.css";
import "./ContactUs.css";
// optional if separate styling for About

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Fetch tasks when logged in
  useEffect(() => {
    if (!token) return;

    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks", {
          headers: { Authorization: token },
        });
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [token]);

  // Add Task
  const addTask = async (task) => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(task),
      });
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Update Task
  const updateTask = async (id, updatedTask) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? data : task))
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Toggle Done
  const toggleDone = async (id, completed) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ completed }),
      });
      const data = await res.json();
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? data : task))
      );
    } catch (err) {
      console.error("Error marking task done:", err);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Login/Signup success
  const handleAuthSuccess = (data) => {
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  // Logout
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setTasks([]);
  };

  // Contact form submit
  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setContactData({ name: "", email: "", message: "" });
  };

  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="app-container">
        {!token ? (
          <>
            {/* Landing / Auth Section */}
            <section className="hero">
              <h1>📌 Organize Your Work, Boost Productivity</h1>
              <p>
                Task Manager helps you stay on track with your tasks. Sign up
                and start managing your work like a pro!
              </p>
              <div className="auth-section">
                <AuthForm onAuthSuccess={handleAuthSuccess} />
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-container">
              <h2>About Us</h2>
              <p>
                Task Manager is a simple and powerful tool designed to help you
                keep track of tasks, improve your productivity, and never miss a
                deadline again.
              </p>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-container">
              <h2>Contact Us</h2>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={contactData.name}
                  onChange={handleContactChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={contactData.email}
                  onChange={handleContactChange}
                  required
                />
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  value={contactData.message}
                  onChange={handleContactChange}
                  required
                />
                <button type="submit">Send Message</button>
              </form>
            </section>
          </>
        ) : (
          <>
            {/* Dashboard */}
            <h1>📌 Task Manager</h1>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
            <TaskForm onAdd={addTask} />
            <TaskList
              tasks={tasks}
              onUpdate={updateTask}
              onToggleDone={toggleDone}
              onDelete={deleteTask}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
