import "../styles/Form.css";
import { Field } from "./Field";
import { Row } from "./Row";
import { Section } from "./Section";

let EDUCATION_ID = 0;
let WORK_ID = 0;

function getFieldId(fieldName, id) {
  return fieldName + "-" + id;
}

function buildPersonalSection(person, setPerson) {
  function updatePersonField(e, field) {
    setPerson((prev) => {
      return { ...prev, [field]: e.target.value };
    });
  }
  return (
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
  );
}

function buildEducationSection(educationItems, setEducationItems) {
  function addEducationItem(event) {
    event.preventDefault();
    EDUCATION_ID += 1;

    setEducationItems((prev) => {
      return [...prev, { id: EDUCATION_ID }];
    });
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

  function deleteEducationItem(event, id) {
    event.preventDefault();
    setEducationItems(educationItems.filter((item) => item.id !== id));
  }

  return (
    <Section name="Education">
      {educationItems.map((item, index) => {
        return (
          <div key={item.id} className="entry">
            <div className="form-section-title">
              <span className="entry-title">
                Details {educationItems.length > 1 && index + 1}
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
                id={getFieldId("title", item.id)}
                required={true}
                onChangeHandler={(event) =>
                  updateEducationItemField(event, item.id, "title")
                }
                value={item.title}
              />
              <Field
                name="Date"
                id={getFieldId("date", item.id)}
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
                id={getFieldId("school", item.id)}
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
  );
}

function buildWorkSection(workItems, setWorkItems) {
  function addWorkItem(event) {
    event.preventDefault();
    WORK_ID += 1;

    setWorkItems((prev) => {
      return [...prev, { id: WORK_ID }];
    });
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

  return (
    <Section name="Work">
      {workItems.map((item, index) => {
        return (
          <div key={item.id} className="entry">
            <div className="form-section-title">
              <span className="entry-title">
                Details {workItems.length > 1 && index + 1}
              </span>
              <button
                className="btn btn-danger"
                onClick={(event) => deleteWorkItem(event, item.id)}
              >
                Delete
              </button>
            </div>
            <Row columns={2}>
              <Field
                name="Company"
                id={getFieldId("company", item.id)}
                onChangeHandler={(event) =>
                  updateWorkItemField(event, item.id, "company")
                }
                value={item.company}
                required={true}
              />
              <Field
                name="Position title"
                id={getFieldId("position", item.id)}
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
                id={getFieldId("fromDate", item.id)}
                type="date"
                onChangeHandler={(event) =>
                  updateWorkItemField(event, item.id, "fromDate")
                }
                value={item.fromDate}
                required={true}
              />
              <Field
                name="Until"
                id={getFieldId("untilDate", item.id)}
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
                id={getFieldId("resp", item.id)}
                onChangeHandler={(event) =>
                  updateWorkItemField(event, item.id, "resp")
                }
                value={item.resp}
                required={true}
              />
            </Row>
          </div>
        );
      })}
      <div className="entry-btn">
        <button className="btn btn-primary" onClick={addWorkItem}>
          Add
        </button>
      </div>
    </Section>
  );
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
  return (
    <form onSubmit={handleBuild}>
      {buildPersonalSection(person, setPerson)}
      {buildEducationSection(educationItems, setEducationItems)}
      {buildWorkSection(workItems, setWorkItems)}
      <input
        class="btn btn-primary btn-submit"
        type="submit"
        value="Build CV"
      />
    </form>
  );
}

export { Form };
