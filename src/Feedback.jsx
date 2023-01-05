import React from "react";
import { FaTimes, FaEdit } from "react-icons/fa";

const Feedback = ({ feedback, removeItem, id, editItem, editing }) => {
  return (
    <div className="single">
      <div className="num">{feedback.rating}</div>

      {!editing && (
        <button onClick={() => removeItem(id)} className="close">
          <FaTimes color="purple" />
        </button>
      )}

      {!editing && (
        <button onClick={() => editItem(id)} className="edit">
          <FaEdit color="purple" />
        </button>
      )}

      <p className="text">{feedback.text}</p>
    </div>
  );
};

export default Feedback;
