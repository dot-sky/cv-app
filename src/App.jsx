import { useState, Fragment } from "react";
import "./styles/Form.css";
import "./App.css";
import { Form } from "./components/Form";
import { CV } from "./components/CV";

function App() {
  const [person, setPerson] = useState({
    name: "Alex Johnson",
    phone: "+1 (555) 123‑4567",
    email: "alex.johnson@example.com",
    site: "www.alexjohnson.com",
  });

  const [educationItems, setEducationItems] = useState([
    {
      id: 0,
      title: "Bachelor of Science in Computer Science",
      school: "University of ",
      date: "2022-06-15",
    },
    {
      id: 1,
      title: "Master of Business Administration",
      school: "Boston Business School",
      date: "2024-06-15",
    },
  ]);

  const [workItems, setWorkItems] = useState([
    {
      id: 0,
      company: "TechNova Solutions",
      position: "Frontend Developer",
      fromDate: "2022-07-01",
      untilDate: "2025-07-01",
      resp: "Developed and maintained responsive web interfaces using React and Tailwind CSS. Collaborated closely with backend developers to integrate RESTful APIs, optimized performance for mobile devices.",
    },
    {
      id: 1,
      company: "Webify Labs",
      position: "Junior Web Developer",
      fromDate: "2020-08-01",
      untilDate: "2022-06-30",
      resp: "Assisted in building and enhancing web applications, implemented UI components with JavaScript and CSS, and collaborated on user interface design improvements. Supported debugging and testing processes to ensure product quality.",
    },
  ]);

  const [edit, setEdit] = useState(false);

  function handleBuild(e) {
    e.preventDefault();
    e.target.reportValidity();
    if (e.target.checkValidity()) {
      setEdit((prev) => !prev);
    }
  }

  function handleEdit(e) {
    setEdit((prev) => !prev);
  }
  return (
    <div className="main-wrapper">
      {edit ? (
        <Form
          person={person}
          setPerson={setPerson}
          educationItems={educationItems}
          setEducationItems={setEducationItems}
          workItems={workItems}
          setWorkItems={setWorkItems}
          handleBuild={handleBuild}
        />
      ) : (
        <CV
          person={person}
          educationItems={educationItems}
          workItems={workItems}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default App;
