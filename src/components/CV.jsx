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

function formatDate(date) {
  const dateValues = date.split("-");
  return dateValues[1] + "/" + dateValues[0];
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
      <h2>Work Experience</h2>
      {workItems.map((item) => {
        return (
          <div className="entry-wrapper">
            <div className="entry-highlight">
              <div className="entry-date">
                {formatDate(item.fromDate)} to {formatDate(item.untilDate)}
              </div>
              <div className="entry-place">{item.company}</div>
            </div>
            <div className="entry-details">
              <h5 className="entry-title">{item.position}</h5>
              <p>{item.resp}</p>
            </div>
          </div>
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
