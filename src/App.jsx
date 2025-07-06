import { useState, Fragment } from "react";
import "./styles/Form.css";
import "./App.css";
import { Form } from "./components/Form";
import { CV } from "./components/CV";
import { Footer } from "./components/Footer";

const empty = {
  person: {
    name: "",
    phone: "",
    email: "",
    site: "",
  },
  educationItems: [
    {
      id: 0,
      title: "",
      school: "",
      date: "",
    },
  ],
  workItems: [
    {
      id: 0,
      company: "",
      position: "",
      fromDate: "",
      untilDate: "",
      resp: "",
    },
  ],
};

const defaultPerson = {
  name: "Alex Johnson",
  phone: "+1 (555) 123‑4567",
  email: "alex.johnson@example.com",
  site: "www.alexjohnson.com",
};

const defaultEducationItems = [
  {
    id: 0,
    title: "Bachelor of Science in Computer Science",
    school: "University of Boston",
    date: "2022-06-15",
  },
  {
    id: 1,
    title: "Master of Business Administration",
    school: "Boston Business School",
    date: "2024-06-15",
  },
];

const defaultWorkItems = [
  {
    id: 0,
    company: "TechNova Solutions",
    position: "Frontend Developer",
    fromDate: "2022-07-01",
    untilDate: "",
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
];

function App() {
  const [person, setPerson] = useState(empty.person);
  const [educationItems, setEducationItems] = useState(empty.educationItems);
  const [workItems, setWorkItems] = useState(empty.workItems);

  const [edit, setEdit] = useState(true);

  function handleBuild(e) {
    let form = e.target;

    if (form.tagName !== "FORM") {
      form = form.parentElement.parentElement.nextSibling;
    }

    e.preventDefault();
    form.reportValidity();
    form.reportValidity();
    if (form.checkValidity()) {
      setEdit((prev) => !prev);
    }
  }

  function clearValues() {
    setPerson(empty.person);
    setEducationItems(empty.educationItems);
    setWorkItems(empty.workItems);
  }

  function setDefaultValues() {
    setPerson(defaultPerson);
    setEducationItems(defaultEducationItems);
    setWorkItems(defaultWorkItems);
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
          clearValues={clearValues}
          setDefaultValues={setDefaultValues}
        />
      ) : (
        <CV
          person={person}
          educationItems={educationItems}
          workItems={workItems}
          handleEdit={handleEdit}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
