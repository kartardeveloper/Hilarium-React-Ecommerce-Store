const MinusIcon = ({ color, fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={16}
    height={16}
    color={color ? color : "#000000"}
    fill={fill ? fill : "none"}
    {...props}
  >
    <path
      d="M20 12L4 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MinusIcon;
