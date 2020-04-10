import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props.feedback;
  const total = good + neutral + bad;

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={(good - bad) / total} />
          <Statistic text="positive" value={`${100 * (good / total)} %`} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stats = { good: good, neutral: neutral, bad: bad };

  return (
    <div>
      <Display title="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Display title="statistics" />
      <Statistics feedback={stats} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
