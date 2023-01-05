import React, { useEffect, useState, useRef } from "react";
import data from "./data";
import Feedback from "./Feedback";

const App = () => {
  const [feedbacks, setFeedbacks] = useState(data);
  const [text, setText] = useState("");
  const [rating, setRating] = useState();
  const [averaged, setAveraged] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const pushit = (e) => {
    if (editing) {
      e.preventDefault();

      setFeedbacks(
        feedbacks.map((feedback) => {
          if (feedback.id == editingItem) {
            return { ...feedback, rating: rating, text: text };
          }
          return feedback;
        })
      );
      setEditing(false);
    } else {
      e.preventDefault();
      setFeedbacks([
        ...feedbacks,
        { id: feedbacks.length, rating: +rating, text: text },
      ]);
      setText("");
    }
  };
  const removeItem = (id) => {
    setFeedbacks(feedbacks.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    setText(feedbacks[id].text);
    inputRef.current.focus();
    console.log(feedbacks[id]);
    setEditing(true);
    setEditingItem(id);
  };

  useEffect(() => {
    setAveraged(0);
    setAveraged(
      feedbacks.reduce((acc, feedback) => {
        return acc + feedback.rating;
      }, 0) / feedbacks.length
    );
  }, [feedbacks]);
  const inputRef = useRef();
  return (
    <div>
      <header>
        <h2>Feedback</h2>
      </header>
      <form onSubmit={pushit}>
        <h3>How would you rate your service with us</h3>
        <ul className="rating">
          {Array.from({ length: 10 }, (_, i) => (
            <li className="active" key={`rating-${i + 1}`}>
              <input
                type="radio"
                id={i + 1}
                name="rating"
                value={i + 1}
                onChange={(e) => setRating(+e.target.id)}
              />
              <label htmlFor={i + 1}>{i + 1}</label>
            </li>
          ))}
        </ul>
        <div>
          <input
            placeholder="Write a review"
            className="sendinput"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={inputRef}
          />
          <button
            disabled={text.trim().length < 9 || !rating}
            className="sendbutton"
          >
            Send
          </button>
        </div>
      </form>
      <div className="info">
        <p>{feedbacks.length} Reviews</p>
        <p>
          Average Rating:
          {feedbacks.length > 0 ? averaged.toFixed(2) : 0}
        </p>
      </div>
      {feedbacks.map((feedback) => {
        return (
          <Feedback
            id={feedback.id}
            removeItem={removeItem}
            key={feedback.id}
            feedback={feedback}
            editItem={editItem}
            editing={editing}
          />
        );
      })}
    </div>
  );
};

export default App;
