export default function Button({ children, textOnly, className, ...props }) {
  let classes = !textOnly ? "button " : "";
  if (className) {
    classes += `${className}`;
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
