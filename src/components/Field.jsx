import "../styles/Field.css";
function Field({
  name,
  id,
  value,
  required = false,
  type = "text",
  onChangeHandler,
  Tag = "input",
}) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {name}
        {required && <span className="required-symbol"> *</span>}
      </label>

      <Tag
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
