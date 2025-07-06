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
    <>
      <div className="cv-wrapper">
        <h1>{person.name}</h1>
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
        <h3>Work Experience</h3>
        {workItems.map((item) => {
          return (
            <div className="entry-wrapper" key={item.id}>
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
        <h3>Education</h3>
        {educationItems.map((item) => {
          return (
            <div className="entry-wrapper" key={item.id}>
              <div className="entry-highlight">
                <div className="entry-date">{formatDate(item.date)}</div>
                <div className="entry-place">{item.school}</div>
              </div>
              <div className="entry-details">
                <h5 className="entry-title">{item.title}</h5>
              </div>
            </div>
          );
        })}
      </div>
      <button class="btn btn-primary btn-submit" onClick={handleEdit}>
        Edit
      </button>
    </>
  );
}
export { CV };
