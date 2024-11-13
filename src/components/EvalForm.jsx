import React, {useState} from 'react';
import {evalApi} from "../services/apis.js"

function EvalForm({ token }) {
  const [responses, setResponses] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
    question9: '',
    question10: '',
  });

  const handleChange = (e) => {
    setResponses({ ...responses, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await evalApi.post('/submit', {
        token,
        ...responses,
      });
      alert('Response successfully saved');
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
      <div>
        <h1>Training Evaluation Form</h1>
      </div>
  );
}

export default EvalForm;