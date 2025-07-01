import { useState, Fragment } from "react";
import "./styles/Form.css";
import "./App.css";

let EDUCATION_ID = 0;

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
      />
    </div>
  );
}

function Row({ columns = 1, children }) {
  return (
    <div
      className="formRow"
      style={{ gridTemplateColumns: "1fr ".repeat(columns) }}
    >
      {children}
    </div>
  );
}

function Section({ name, children }) {
  return (
    <fieldset className="formSection">
      <legend>{name}</legend>
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
  handleEdit,
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

  return (
    <form>
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
        {educationItems.map((item) => {
          const itemTitleId = buildFieldId("title", item.id);
          const itemDateId = buildFieldId("date", item.id);
          const itemSchoolId = buildFieldId("school", item.id);
          return (
            <Fragment key={item.id}>
              <button onClick={(event) => deleteEducationItem(event, item.id)}>
                Delete
              </button>
              <Row columns={2}>
                <Field
                  name="Title"
                  id={itemTitleId}
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
                  id={itemSchoolId}
                  required={true}
                  onChangeHandler={(event) =>
                    updateEducationItemField(event, item.id, "school")
                  }
                  value={item.school}
                />
              </Row>
            </Fragment>
          );
        })}
        <button onClick={addEducationItem}>Add</button>
      </Section>
      <Section name="Work">
        <Row columns={2}>
          <Field name="Company" id="company" required={true} />
          <Field name="Position title" id="positionTitle" required={true} />
        </Row>
        <Row columns={2}>
          <Field name="From" id="fromDate" type="date" required={true} />
          <Field name="Until" id="untilDate" type="date" />
        </Row>
        <Row columns={1}>
          <Field
            name="Main responsibilities"
            id="responsibilities"
            required={true}
          />
        </Row>
      </Section>
      <input type="submit" value="Build CV" onClick={handleEdit} />
    </form>
  );
}

function CV({ person, handleEdit, educationItems }) {
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
  const [workItems, setWorkItems] = useState([]);

  const [edit, setEdit] = useState(true);

  function handleEdit(e) {
    e.preventDefault();
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
          handleEdit={handleEdit}
        />
      ) : (
        <CV
          person={person}
          educationItems={educationItems}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
}

export default App;
