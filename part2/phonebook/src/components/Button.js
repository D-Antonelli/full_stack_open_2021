import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={props.className}
    >
      {props.text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
