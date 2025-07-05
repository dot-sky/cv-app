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
export { Field };
