import { useState, Fragment } from "react";
import "./styles/Form.css";
import "./App.css";
import { Form } from "./components/Form";

function CV({ person, handleEdit, educationItems, workItems }) {
  return (
    <>
      <h2>{person.firstName + " " + person.lastName}</h2>
      <p>
        {person.email} {person.phone}
      </p>
      <h2>Education</h2>
      {educationItems.map((item) => {
        return (
          <p key={item.id}>
            {item.title} - {item.school} - {item.date}
          </p>
        );
      })}
      <h2>Work</h2>
      {workItems.map((item) => {
        return (
          <Fragment key={item.id}>
            <p>
              {item.company} - {item.position} - from: {item.fromDate} to:{" "}
              {item.untilDate}
            </p>
            <p>{item.resp}</p>
          </Fragment>
        );
      })}
      <button onClick={handleEdit}>Edit</button>
    </>
  );
}

function App() {
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [educationItems, setEducationItems] = useState([
    { id: 0, title: "", school: "", date: "" },
  ]);
  const [workItems, setWorkItems] = useState([
    { id: 0, company: "", position: "", fromDate: "", untilDate: "", resp: "" },
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
    <>
      <h1>CV Builder</h1>
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
    </>
  );
}

export default App;
