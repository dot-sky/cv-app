import { Fragment } from "react";
import "../styles/CV.css";
import phoneIcon from "../assets/phone-flip.svg";
import mailIcon from "../assets/envelope.svg";
import webIcon from "../assets/browser.svg";
function ContactTab({ person, icon, title, field }) {
  return (
    <div className="contact-wrapper">
      <div>
        <img src={icon} className="contact-icon" />
      </div>
      <div>
        <div className="contact-title">{title}</div>
        <div className="contact-content">{person[field]}</div>
      </div>
    </div>
  );
}
function CV({ person, handleEdit, educationItems, workItems }) {
  return (
    <div className="cv-wrapper">
      <h1>{person.firstName + " " + person.lastName}</h1>
      <hr />
      <div className="contact-info">
        <ContactTab
          person={person}
          icon={mailIcon}
          title="Email"
          field="email"
        />
        <ContactTab
          person={person}
          icon={phoneIcon}
          title="Phone"
          field="phone"
        />
        {person.site && person.site !== "" && (
          <ContactTab
            person={person}
            icon={webIcon}
            title="Site"
            field="site"
          />
        )}
      </div>
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
    </div>
  );
}
export { CV };
