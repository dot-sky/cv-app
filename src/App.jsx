import { useState, Fragment } from "react";
import "./styles/Form.css";
import "./App.css";

let EDUCATION_ID = 0;
let WORK_ID = 0;

function Field({
  name,
  id,
  value,
  required = false,
  type = "text",
  onChangeHandler,
}) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {name}
        {required && "*"}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChangeHandler}
        required={required}
      />
    </div>
  );
}

function Row({ columns = 1, children }) {
  return (
    <div
      className="form-row"
      style={{ gridTemplateColumns: "1fr ".repeat(columns) }}
    >
      {children}
    </div>
  );
}

function Section({ name, children }) {
  return (
    <fieldset className="form-section">
      <h4>{name}</h4>
      {children}
    </fieldset>
  );
}

function buildFieldId(fieldName, id) {
  return fieldName + "-" + id;
}

function Form({
  person,
  setPerson,
  educationItems,
  setEducationItems,
  workItems,
  setWorkItems,
  handleBuild,
}) {
  function updatePersonField(e, field) {
    setPerson((prev) => {
      return { ...prev, [field]: e.target.value };
    });
  }

  function addEducationItem(event) {
    event.preventDefault();
    EDUCATION_ID += 1;

    setEducationItems((prev) => {
      return [...prev, { id: EDUCATION_ID }];
    });
  }

  function deleteEducationItem(event, id) {
    event.preventDefault();
    setEducationItems(educationItems.filter((item) => item.id !== id));
  }

  function updateEducationItemField(event, id, field) {
    setEducationItems(
      educationItems.map((item) => {
        const newItem = { ...item };
        if (newItem.id === id) {
          newItem[field] = event.target.value;
        }
        return newItem;
      })
    );
  }

  function updateWorkItemField(event, id, field) {
    setWorkItems(
      workItems.map((item) => {
        const newItem = { ...item };
        if (newItem.id === id) {
          newItem[field] = event.target.value;
        }
        return newItem;
      })
    );
  }

  function deleteWorkItem(event, id) {
    event.preventDefault();
    setWorkItems(workItems.filter((item) => item.id !== id));
  }

  function addWorkItem(event) {
    event.preventDefault();
    WORK_ID += 1;

    setWorkItems((prev) => {
      return [...prev, { id: WORK_ID }];
    });
  }

  return (
    <form onSubmit={handleBuild}>
      <Section name="Personal Information">
        <Row columns={2}>
          <Field
            name="First Name"
            id="firstName"
            required={true}
            onChangeHandler={(event) => updatePersonField(event, "firstName")}
            value={person.firstName}
          />
          <Field
            name="Last Name"
            id="lastName"
            required={true}
            onChangeHandler={(event) => updatePersonField(event, "lastName")}
            value={person.lastName}
          />
        </Row>
        <Row columns={2}>
          <Field
            name="Email"
            id="email"
            type="email"
            required={true}
            onChangeHandler={(event) => updatePersonField(event, "email")}
            value={person.email}
          />
          <Field
            name="Phone"
            id="phone"
            type="tel"
            onChangeHandler={(event) => updatePersonField(event, "phone")}
            value={person.phone}
          />
        </Row>
      </Section>
      <Section name="Education">
        {educationItems.map((item, i) => {
          return (
            <div key={item.id} class="entry">
              <div className="form-section-title">
                <span class="entry-title">
                  Details {educationItems.length > 1 && i + 1}
                </span>
                <button
                  className="btn btn-danger"
                  onClick={(event) => deleteEducationItem(event, item.id)}
                >
                  Delete
                </button>
              </div>
              <Row columns={2}>
                <Field
                  name="Title"
                  id={buildFieldId("title", item.id)}
                  required={true}
                  onChangeHandler={(event) =>
                    updateEducationItemField(event, item.id, "title")
                  }
                  value={item.title}
                />
                <Field
                  name="Date"
                  id={buildFieldId("date", item.id)}
                  type="date"
                  required={true}
                  onChangeHandler={(event) =>
                    updateEducationItemField(event, item.id, "date")
                  }
                  value={item.date}
                />
              </Row>
              <Row columns={1}>
                <Field
                  name="School"
                  id={buildFieldId("school", item.id)}
                  required={true}
                  onChangeHandler={(event) =>
                    updateEducationItemField(event, item.id, "school")
                  }
                  value={item.school}
                />
              </Row>
            </div>
          );
        })}
        <div className="entry-btn">
          <button className="btn btn-primary" onClick={addEducationItem}>
            Add
          </button>
        </div>
      </Section>
      <Section name="Work">
        {workItems.map((item) => {
          return (
            <Fragment key={item.id}>
              <button onClick={(event) => deleteWorkItem(event, item.id)}>
                Delete
              </button>
              <Row columns={2}>
                <Field
                  name="Company"
                  id={buildFieldId("company", item.id)}
                  onChangeHandler={(event) =>
                    updateWorkItemField(event, item.id, "company")
                  }
                  value={item.company}
                  required={true}
                />
                <Field
                  name="Position title"
                  id={buildFieldId("position", item.id)}
                  onChangeHandler={(event) =>
                    updateWorkItemField(event, item.id, "position")
                  }
                  value={item.position}
                  required={true}
                />
              </Row>
              <Row columns={2}>
                <Field
                  name="From"
                  id={buildFieldId("fromDate", item.id)}
                  type="date"
                  onChangeHandler={(event) =>
                    updateWorkItemField(event, item.id, "fromDate")
                  }
                  value={item.fromDate}
                  required={true}
                />
                <Field
                  name="Until"
                  id={buildFieldId("untilDate", item.id)}
                  onChangeHandler={(event) =>
                    updateWorkItemField(event, item.id, "untilDate")
                  }
                  value={item.untilDate}
                  type="date"
                />
              </Row>
              <Row columns={1}>
                <Field
                  name="Main responsibilities"
                  id={buildFieldId("resp", item.id)}
                  onChangeHandler={(event) =>
                    updateWorkItemField(event, item.id, "resp")
                  }
                  value={item.resp}
                  required={true}
                />
              </Row>
            </Fragment>
          );
        })}
        <button onClick={addWorkItem}>Add</button>
      </Section>
      <input type="submit" value="Build CV" />
    </form>
  );
}

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
