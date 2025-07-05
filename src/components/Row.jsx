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

export { Row };
