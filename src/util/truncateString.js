export default function truncateString(string, words) {
  const stringArray = string.split(" ");
  const truncateArray = stringArray.slice(0, words);
  const truncateString = `${truncateArray.join(" ")}...`;
  return truncateString;
}
