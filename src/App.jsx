import { useState, Fragment } from "react";
import "./styles/Form.css";
import "./App.css";
import { Form } from "./components/Form";
import { CV } from "./components/CV";

function App() {
  const [person, setPerson] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    phone: "+1 (555) 123‑4567",
    email: "alex.johnson@example.com",
    site: "www.alexjohnson.com",
  });

  const [educationItems, setEducationItems] = useState([
    {
      id: 0,
      title: "Bachelor of Science in Computer Science",
      school: "University of Example",
      date: "2022-06-15",
    },
    {
      id: 1,
      title: "Master of Business Administration",
      school: "Example Business School",
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
      resp: "Developed and maintained responsive web interfaces using React and Tailwind CSS.",
    },
    {
      id: 1,
      company: "Webify Labs",
      position: "Junior Web Developer",
      fromDate: "2020-08-01",
      untilDate: "2022-06-30",
      resp: "Assisted in building web applications and collaborated on UI design improvements.",
    },
  ]);

  const [edit, setEdit] = useState(true);

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
      <CV
        person={person}
        educationItems={educationItems}
        workItems={workItems}
        handleEdit={handleEdit}
      />
      {/* {edit ? (
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
      )} */}
    </div>
  );
}

export default App;
