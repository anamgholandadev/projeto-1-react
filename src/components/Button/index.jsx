import "./styles.css";
export const Button = ({ text, onclick, disabled }) => {
  return (
    <button disabled={disabled} className="button" onClick={onclick}>
      {text}
    </button>
  );
};
