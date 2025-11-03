import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Webpage = () => {
  const [name, setName] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [hobbyInput, setHobbyInput] = useState("");
  const [message, setMessage] = useState("");
  const [matches, setMatches] = useState([]);

  const addHobby = () => {
    if (hobbyInput.trim() !== "") {
      setHobbies([...hobbies, hobbyInput.trim()]);
      setHobbyInput("");
    }
  };

  const saveData = async () => {
    try {
      await axios.post(`${API_URL}/hobbies/add`, { name, hobbies });
      alert("✅ Data saved successfully!");
      setName("");
      setHobbies([]);
      setMessage("");
      setMatches([]);
    } catch (error) {
      alert("❌ Error saving data");
    }
  };

  const findSimilar = async () => {
    if (!name) {
      alert("Please enter your name first!");
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/hobbies/find-similar/${name}`);
      if (res.data.matches && res.data.matches.length > 0) {
        setMatches(res.data.matches);
        setMessage("");
      } else {
        setMatches([]);
        setMessage(res.data.message || "No people matching your hobby.");
      }
    } catch (err) {
      setMatches([]);
      setMessage("Error finding similar hobbies");
    }
  };

  // 🎨 Inline Styles
  const styles = {
    container: {
      backgroundColor: "#0e0e10",
      color: "#e4e4e4",
      minHeight: "100vh",
      textAlign: "center",
      padding: "40px",
      fontFamily: "Poppins, sans-serif",
    },
    card: {
      backgroundColor: "#1b1b1f",
      borderRadius: "15px",
      boxShadow: "0px 0px 20px rgba(255,255,255,0.05)",
      width: "450px",
      margin: "auto",
      padding: "30px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    input: {
      padding: "10px",
      margin: "10px",
      borderRadius: "8px",
      border: "1px solid #555",
      backgroundColor: "#26262b",
      color: "#fff",
      outline: "none",
      width: "80%",
      transition: "all 0.2s ease-in-out",
    },
    button: {
      padding: "10px 20px",
      margin: "10px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#5b8cff",
      color: "#fff",
      cursor: "pointer",
      transition: "transform 0.2s ease, background-color 0.3s ease",
      fontWeight: "600",
    },
    buttonHover: {
      backgroundColor: "#6d9aff",
      transform: "scale(1.05)",
    },
    list: {
      textAlign: "left",
      width: "70%",
      margin: "10px auto",
      backgroundColor: "#121214",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0px 0px 10px rgba(255,255,255,0.05)",
    },
    listItem: {
      margin: "8px 0",
      color: "#b8b8b8",
      transition: "color 0.3s ease, transform 0.2s ease",
    },
    title: {
      color: "#ffffff",
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
      letterSpacing: "1px",
      textShadow: "0 0 10px rgba(91,140,255,0.5)",
    },
    subtitle: {
      marginTop: "30px",
      fontSize: "20px",
      color: "#9ebaff",
      textShadow: "0 0 6px rgba(91,140,255,0.5)",
    },
    message: {
      marginTop: "20px",
      fontSize: "18px",
      color: "#9ebaff",
      textShadow: "0 0 8px rgba(91,140,255,0.4)",
    },
    tableContainer: {
      margin: "20px auto",
      width: "90%",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#1b1b1f",
      borderRadius: "8px",
      overflow: "hidden",
    },
    tableHeader: {
      backgroundColor: "#2d2d35",
      color: "#ffffff",
      padding: "12px 15px",
      textAlign: "left",
      fontSize: "16px",
      fontWeight: "600",
    },
    tableRow: {
      borderBottom: "1px solid #26262b",
      transition: "background-color 0.3s ease",
    },
    tableCell: {
      padding: "12px 15px",
      color: "#b8b8b8",
    },
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.card,
          animation: "float 2s ease-in-out infinite alternate",
        }}
      >
        <h2 style={styles.title}>🎯 Hobby Matcher</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <div>
          <input
            type="text"
            placeholder="Enter a hobby"
            value={hobbyInput}
            onChange={(e) => setHobbyInput(e.target.value)}
            style={styles.input}
          />
          <button
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style = { ...styles.button, ...styles.buttonHover })
            }
            onMouseLeave={(e) => (e.target.style = styles.button)}
            onClick={addHobby}
          >
            Add Hobby
          </button>
        </div>

        <ul style={styles.list}>
          {hobbies.map((h, i) => (
            <li
              key={i}
              style={styles.listItem}
              onMouseEnter={(e) =>
                (e.target.style = {
                  ...styles.listItem,
                  color: "#fff",
                  transform: "translateX(5px)",
                })
              }
              onMouseLeave={(e) => (e.target.style = styles.listItem)}
            >
              {i + 1}) {h}
            </li>
          ))}
        </ul>

        <button
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style = { ...styles.button, ...styles.buttonHover })
          }
          onMouseLeave={(e) => (e.target.style = styles.button)}
          onClick={saveData}
        >
          Save
        </button>

        <button
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style = { ...styles.button, ...styles.buttonHover })
          }
          onMouseLeave={(e) => (e.target.style = styles.button)}
          onClick={findSimilar}
        >
          Find People with Same Hobbies
        </button>

        {message && <p style={styles.message}>{message}</p>}

        {matches.length > 0 && (
          <div>
            <h3 style={styles.subtitle}>People with Similar Hobbies:</h3>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Name</th>
                    <th style={styles.tableHeader}>Matched Hobbies</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match, i) => (
                    <tr key={i} style={styles.tableRow}>
                      <td style={styles.tableCell}>{match.name}</td>
                      <td style={styles.tableCell}>{match.matchedHobbies.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Simple floating animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
};

export default Webpage;
