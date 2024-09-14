export default function Input({ label, id, ...props }) {
  return (
    <div className="field-wrapper">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input id={id} name={id} {...props} />
    </div>
  );
}
