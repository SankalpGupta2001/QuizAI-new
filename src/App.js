import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import "./App.css";


function App() {

  const [gradeLevel, setGradeLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [curriculum, setCurriculum] = useState('');
  const [topic, setTopic] = useState('');
  const [subTopic, setSubTopic] = useState('');
  const [MCQNum, setMCQNum] = useState(0);
  const [DifficultMCQ, setDifficultMCQ] = useState('Easy');
  const [isMCQChecked, setIsMCQChecked] = useState(false);

  const [FIBNum, setFIBNum] = useState(0);
  const [DifficultFIB, setDifficultFIB] = useState('Easy');
  const [isFIBChecked, setIsFIBChecked] = useState(false);

  const [TFNum, setTFNum] = useState(0);
  const [DifficultTF, setDifficultTF] = useState('Easy');
  const [isTFChecked, setIsTFChecked] = useState(false);

  const [MatchingNum, setMatchingNum] = useState(0);
  const [DifficultMatching, setDifficultMatching] = useState('Easy');
  const [isMatchingChecked, setIsMatchingChecked] = useState(false);

  const [SubNum, setSubNum] = useState(0);
  const [DifficultSub, setDifficultSub] = useState('Easy');
  const [isSubChecked, setIsSubChecked] = useState(false);

  const [response, setResponse] = useState([]);
  const [showAnswer, setShowAnswer] = useState(Array(response.length).fill(false));

  const [selectedOptions, setSelectedOptions] = useState(Array(response.length).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage , setErrorMessage] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [JSONstring ,setJSONString] = useState('');

  const handleToggleResponse = () => {
    setShowResponse(!showResponse);
  };


  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
  };



  const toggleAnswer = (index) => {
    const newShowAnswer = [...showAnswer];
    newShowAnswer[index] = !newShowAnswer[index];
    setShowAnswer(newShowAnswer);
  };

  console.log(response);




  const handleSubmit = (e) => {
    e.preventDefault();
  setIsLoading(true);
  setErrorMessage('');

    const formData = {
      NumMCQ: MCQNum,
      NumFIB: FIBNum,
      NumMatching: MatchingNum,
      NumSubjective: SubNum,
      NumTF: TFNum,
      MCQDifficulty: DifficultMCQ,
      FIBDifficulty: DifficultFIB,
      MatchingDifficulty: DifficultMatching,
      TFDifficulty: DifficultTF,
      SubjectiveDifficulty: DifficultSub,
      Curriculum: curriculum,
      GradeLevel: gradeLevel,
      Topics: topic,
      SubTopics: subTopic,
      Subject: subject,
      MCQChecked :isMCQChecked,
      FIBChecked :isFIBChecked,
      TFChecked :isTFChecked,
      MatchingChecked :isMatchingChecked,
      SubChecked :isSubChecked

    };

    console.log(formData);




    axios.post("https://quizai-backend.onrender.com/generate-questions", formData)
      .then((response) => {
        let resposneString = response.data.questions;
        setJSONString(resposneString);
        let responseStringJSON = JSON.parse(resposneString);
        setResponse(responseStringJSON);
  setIsLoading(false);


      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
        setErrorMessage("Error generating questions. Please check JSON.");
      });
  };

  const handleMCQCheckboxChange = () => {
    setIsMCQChecked(!isMCQChecked);
    if (!isMCQChecked) {
      setMCQNum(0);
      setDifficultMCQ('Easy');
    }
  };



  const handleFIBCheckboxChange = () => {
    setIsFIBChecked(!isFIBChecked);
    if (!isFIBChecked) {
      setFIBNum(0);
      setDifficultFIB('Easy');
    }
  };


  const handleTFCheckboxChange = () => {
    setIsTFChecked(!isTFChecked);
    if (!isTFChecked) {
      setTFNum(0);
      setDifficultTF('Easy');
    }
  };


  const handleMatchingCheckboxChange = () => {
    setIsMatchingChecked(!isMatchingChecked);
    if (!isMatchingChecked) {
      setMatchingNum(0);
      setDifficultMatching('Easy');
    }
  };


  const handleSubCheckboxChange = () => {
    setIsSubChecked(!isSubChecked);
    if (!isSubChecked) {
      setSubNum(0);
      setDifficultSub('Easy');
    }
  };




  return (
    <div className="App">
      <div className="main-container">
        <div className="form-container">
          <h1 className="form-title">Generate Questions Form</h1>
          <Form onSubmit={handleSubmit} className="custom-form">

            <div className="form-group">
              <label>
                Grade Level:
                <input type="text" value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} className="form-control" />
              </label>
            </div>

            <div className="form-group">
              <label>
                Subject:
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="form-control" />
              </label>
            </div>

            <div className="form-group">
              <label>
                Curriculum:
                <input type="text" value={curriculum} onChange={(e) => setCurriculum(e.target.value)} className="form-control" />
              </label>
            </div>

            <div className="form-group">
              <label>
                Topic:
                <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className="form-control" />
              </label>
            </div>

            <div className="form-group">
              <label>
                Sub-Topic:
                <input type="text" value={subTopic} onChange={(e) => setSubTopic(e.target.value)} className="form-control" />
              </label>
            </div>

            <div className="form-group">
              <InputGroup className="mb-3">
                <InputGroup.Checkbox
                  aria-label="Multiple Choice Questions"
                  checked={isMCQChecked} // Set checkbox state
                  onChange={handleMCQCheckboxChange} // Handle checkbox change
                  className="form-check-input"
                />
                <InputGroup.Text className="form-check-label">MCQ</InputGroup.Text>
                <Form.Control
                  aria-label="Number of Questions"
                  type="number"
                  value={MCQNum}
                  onChange={(e) => setMCQNum(e.target.value === "" ? "" : parseInt(e.target.value))}
                  className="form-control big-input" // Add custom class for bigger input
                />
                <Form.Select
                  aria-label="Difficulty Level"
                  value={DifficultMCQ}
                  onChange={(e) => setDifficultMCQ(e.target.value)}
                  className="form-select big-dropdown" // Add custom class for bigger dropdown
                >
                  <option>Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Form.Select>
              </InputGroup>
            </div>
            <div className="form-group">
              <InputGroup className="mb-3">
                <InputGroup.Checkbox
                  aria-label="Fill in the Blanks"
                  checked={isFIBChecked}
                  onChange={handleFIBCheckboxChange}
                  className="form-check-input"
                />
                <InputGroup.Text className="form-check-label">Fill in the Blanks</InputGroup.Text>
                <Form.Control
                  aria-label="Number of Questions"
                  type="number"
                  value={FIBNum}
                  onChange={(e) => setFIBNum(e.target.value === "" ? "" : parseInt(e.target.value))}
                  className="form-control big-input"
                />
                <Form.Select
                  aria-label="Difficulty Level"
                  value={DifficultFIB}
                  onChange={(e) => setDifficultFIB(e.target.value)}
                  className="form-select big-dropdown"
                >
                  <option>Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Form.Select>
              </InputGroup>
            </div>

            <div className="form-group">
              <InputGroup className="mb-3">
                <InputGroup.Checkbox
                  aria-label="True or False"
                  checked={isTFChecked}
                  onChange={handleTFCheckboxChange}
                  className="form-check-input"
                />
                <InputGroup.Text className="form-check-label">True or False</InputGroup.Text>
                <Form.Control
                  aria-label="Number of Questions"
                  type="number"
                  value={TFNum}
                  onChange={(e) => setTFNum(e.target.value === "" ? "" : parseInt(e.target.value))}
                  className="form-control big-input"
                />
                <Form.Select
                  aria-label="Difficulty Level"
                  value={DifficultTF}
                  onChange={(e) => setDifficultTF(e.target.value)}
                  className="form-select big-dropdown"
                >
                  <option>Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Form.Select>
              </InputGroup>
            </div>

            <div className="form-group">
              <InputGroup className="mb-3">
                <InputGroup.Checkbox
                  aria-label="Matching"
                  checked={isMatchingChecked}
                  onChange={handleMatchingCheckboxChange}
                  className="form-check-input"
                />
                <InputGroup.Text className="form-check-label">Matching</InputGroup.Text>
                <Form.Control
                  aria-label="Number of Questions"
                  type="number"
                  value={MatchingNum}
                  onChange={(e) => setMatchingNum(e.target.value === "" ? "" : parseInt(e.target.value))}
                  className="form-control big-input"
                />
                <Form.Select
                  aria-label="Difficulty Level"
                  value={DifficultMatching}
                  onChange={(e) => setDifficultMatching(e.target.value)}
                  className="form-select big-dropdown"
                >
                  <option>Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Form.Select>
              </InputGroup>
            </div>

            <div className="form-group">
              <InputGroup className="mb-3">
                <InputGroup.Checkbox
                  aria-label="Open Ended"
                  checked={isSubChecked}
                  onChange={handleSubCheckboxChange}
                  className="form-check-input"
                />
                <InputGroup.Text className="form-check-label">Open Ended</InputGroup.Text>
                <Form.Control
                  aria-label="Number of Questions"
                  type="number"
                  value={SubNum}
                  onChange={(e) => setSubNum(e.target.value === "" ? "" : parseInt(e.target.value))}
                  className="form-control big-input"
                />
                <Form.Select
                  aria-label="Difficulty Level"
                  value={DifficultSub}
                  onChange={(e) => setDifficultSub(e.target.value)}
                  className="form-select big-dropdown"
                >
                  <option>Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Form.Select>
              </InputGroup>
            </div>

            <div className="button-container" style={{ display: "flex", alignItems: "center" }}>

            <button type="submit" className="btn btn-primary submitbtn" style={{marginRight:320}}>Generate Questions</button>
            <button className="btn btn-primary submitbtn toggle-response-btn" onClick={handleToggleResponse}>
        {showResponse ? "UnCheck JSON" : "Check JSON"}
      </button>
      </div>

            {isLoading && (
              <p>Loading...</p>
            )}

            {
              errorMessage  !== '' && <p>{errorMessage}</p>
            }
          </Form>
        </div>

       

        <div className="container mt-4">

        {showResponse && (
        <div className="response-section">
         {JSONstring && <p>{JSONstring}</p>}
        </div>
      )}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh', marginBottom: response.length === 0 && 100 }}>
            <h4
              style={{
                backgroundColor: '#eaeaea',
                width: 450,
                textAlign: 'center',
                padding: 10,
                color: 'green',
                borderRadius: 40,

              }}
            >
              Enter Inputs and Get's Your Free AI Generated Questions
            </h4>

          </div>
          {response.length > 0 && (
            <ul className="list-group" style={{ listStyleType: 'none' }}>
              {response.map((question, index) => (

                <li
                  key={index}
                  className={`list-group-item custom-list-item ${index % 2 === 0 ? 'bg-grey' : 'bg-white'}`}
                  style={{ marginBottom: 30, padding: 20, borderRadius: 20 }}
                >

                  <div className="question" style={{ marginBottom: 10 }}>

                    <div>
                      <strong >Question {index + 1}:</strong>

                      <span style={{
                        padding: '4px 8px',
                        background: '#3498db',
                        color: '#ffffff',
                        borderRadius: '4px', marginLeft: 820, marginRight: 50,
                        fontSize: '14px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}>

                        {question["QuestionType"] === "MCQ" && question["QuestionType"]}
                        {(question["QuestionType"] === "FillintheBlanks" || question["QuestionType"] === "Fill in the Blanks") && (
                          <span>F.I.B</span>
                        )}

                        {(question["QuestionType"] === "TrueorFalse" || question["QuestionType"] === "True or False") && (
                          <span>T/F</span>
                        )}

                        {question["QuestionType"] === "Matching" && (
                          <span>Matching</span>
                        )}

                        {question["QuestionType"] === "Subjective" && (
                          <span>Subjective</span>
                        )}


                      </span>

                      {question["QuestionType"] === "MCQ" && (
                        <span style={{
                          padding: '4px 8px',
                          background: '#e74c3c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}>
                          {DifficultMCQ}
                        </span>
                      )}

                      {(question["QuestionType"] === "FillintheBlanks" || question["QuestionType"] === "Fill in the Blanks")&& (
                        <span style={{
                          padding: '4px 8px',
                          background: '#e74c3c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}>
                          {DifficultFIB}
                        </span>
                      )}

                      {(question["QuestionType"] === "TrueorFalse" || question["QuestionType"] === "True or False") && (
                        <span style={{
                          padding: '4px 8px',
                          background: '#e74c3c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}>
                          {DifficultTF}
                        </span>
                      )}

                      {question["QuestionType"] === "Matching" && (
                        <span style={{
                          padding: '4px 8px',
                          background: '#e74c3c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}>
                          {DifficultMatching}
                        </span>
                      )}

                      {question["QuestionType"] === "Subjective" && (
                        <span style={{
                          padding: '4px 8px',
                          background: '#e74c3c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}>
                          {DifficultSub}
                        </span>
                      )}



                    </div>
                    <br />

                    {<pre>{question['Prompt'] && question['Prompt']}</pre>}
                  </div>

                  <hr style={{ border: '0', height: '2px', background: '#e0e0e0', margin: '0 0 20px' }} />

                  {
                    question['QuestionType'] === "TrueorFalse" && (
                      <div className="options" style={{ marginBottom: 10 }}>
                        <strong>Options:</strong>
                        <br />
                        {['True', 'False'].map((option, optionIndex) => (
                          option && (
                            <div key={optionIndex}>
                              <input
                                type="radio"
                                value={option}
                                checked={selectedOptions[index] === optionIndex}
                                onChange={() => handleOptionChange(index, optionIndex)}
                              />
                              <span>{option}</span>
                            </div>
                          )
                        ))}

                      </div>
                    )
                  }


                  {question['Options'] && question['Options'].length > 0 && (
                    <div className="options" style={{ marginBottom: 10 }}>
                      <strong>Options:</strong>
                      <br />
                      {question['Options'].map((option, optionIndex) => (
                        option && (
                          <div key={optionIndex}>
                            <input
                              type="radio"
                              value={option}
                              checked={selectedOptions[index] === optionIndex}
                              onChange={() => handleOptionChange(index, optionIndex)}
                            />
                            <span>{option}</span>
                          </div>
                        )
                      ))}

                    </div>
                  )}



                  {question['QuestionType'] === 'Matching' && (
                    <div className="options" style={{ marginBottom: 10 }}>
                      <strong>Match the following:</strong>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                        <div style={{ flex: 1 }}>
                          {question['LeftCol'].map((leftOption, optionIndex) => (
                            <div key={optionIndex}>
                              {String.fromCharCode(65 + optionIndex)}) {leftOption}
                            </div>
                          ))}
                        </div>
                        <div style={{ flex: 1 }}>
                          {question['RightCol'].map((rightOption, optionIndex) => (
                            <div key={optionIndex}>
                              {rightOption}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}




                  {question['Answer'] && (
                    <div style={{ marginTop: 10 }}>
                      <button onClick={() => toggleAnswer(index)}>
                        {showAnswer[index] ? 'Hide Answer' : 'Check Answer'}
                      </button>
                    </div>
                  )}



                  {showAnswer[index] && question["QuestionType"] !== "Matching" && (
                    <div className="answer" style={{ marginTop: 10 }}>
                      <strong>Answer:</strong>
                      <br />
                      {<pre>{question['Answer']}</pre>}
                      <strong>FeedBack:</strong>
                      <br />
                      {<pre>{question['Feedback']}</pre>}

                    </div>
                  )}

                  {showAnswer[index] && question["QuestionType"] === "Matching" && (
                    <div className="answer" style={{ marginTop: 10 }}>
                      <strong>Answer:</strong>
                      <br />
                      <div>
                        {Object.entries(question["Answer"]).map(([shapeName, shapeComponent], index) => (
                          <div key={index}>
                            {shapeName}: {shapeComponent}
                          </div>
                        ))}
                      </div>
                      <strong>FeedBack:</strong>
                      <br />
                      {<pre>{question['Feedback']}</pre>}

                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

        </div>

      </div>
    </div>
  );
}

export default App;
