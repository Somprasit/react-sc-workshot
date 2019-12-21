import React from "react";
import logo from "./logo.svg";
import "./App.css";
import moment from "moment";
import Input from "./input.js";
import axios from "axios";

const subjects = ["Angular", "React", "Golang"];
const targetDate = moment("12/21/2019 17:00:00:");

function App() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [timer, setTimer] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .get(
        "http://www.mocky.io/v2/5dfde561310000ed1ac96e39?mocky-delay=4000ms&fbclid=IwAR3Y1jsMJS5yQNDirAZTSPeZyVhNNV1MeI6_wRRSlGRZ7wo5xW90LT7m-iw"
      )
      .then(res => {
        const { data } = res;
        console.log(data.response);
        setMessage(data.response);
        setIsLoading(false);
      });
  };

  const updateTimer = () => {
    const diffHrs = targetDate.diff(moment(), "hours");
    const diffMinutes = targetDate.diff(moment(), "minutes") % 60;
    const diffSecons = targetDate.diff(moment(), "seconds") % 60;

    setTimer(`${diffHrs} hours ${diffMinutes} minutes ${diffSecons}seconds`);
    console.log(diffHrs);
  };

  React.useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    axios
      .get(
        "http://www.mocky.io/v2/5dfde8a6310000551ec96e5b?fbclid=IwAR0Js_y1ASxdvaYpqekJ5jid8rWy2jjF5DqRzZF2_E-mX5vqGVHgOf8B7EU"
      )
      .then(res => {
        setSubject(res.data.subject);
      });
    return () => clearInterval(interval);
  }, []);

  console.log("State:", { name, subject, email, message, isChecked });
  return (
    <div className="App">
      <label className="title">Season change Registration Form</label>
      <p>Form end in</p>
      <p>{timer}</p>

      <Input
        label="Name"
        value={name}
        onChangeFromComponent={value => setName(value)}
      />

      {/* <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-success"
            type="text"
            placeholder="Text input"
            value="bulma"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </div>
        <p className="help is-success">This username is available</p>
      </div> */}

      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-danger "
            type="email"
            placeholder="Email input"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p className="help is-danger">This email is invalid</p>
      </div>

      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select
              value={subject}
              onChange={event => setSubject(event.target.value)}
            >
              {subjects.map(subjects => (
                <option key={subjects}>{subjects}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Textarea"
            value={message}
            onChange={event => setMessage(event.target.value)}
          ></textarea>
        </div>
      </div> */}

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              value={isChecked}
              onChange={event => setIsChecked(event.target.checked)}
            />
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      {/* <div className="field">
        <div className="control">
          <label className="radio">
            <input type="radio" name="question" />
            Yes
          </label>
          <label className="radio">
            <input type="radio" name="question" />
            No
          </label>
        </div>
      </div> */}

      <div className="field is-grouped">
        <div className="control">
          <button
            className={`button is-link ${isLoading && "is-loading"}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
      {message}
    </div>
  );
}

export default App;
