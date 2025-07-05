function Section({ name, children }) {
  return (
    <fieldset className="form-section">
      <h4>{name}</h4>
      {children}
    </fieldset>
  );
}
export { Section };
