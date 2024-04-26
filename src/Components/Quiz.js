import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectQuizQuestions, answerQuestion } from "../reducer/QuizSlice";

const Quiz = () => {
  const questions = useSelector(selectQuizQuestions);
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0)

  const handleAnswerSelect = (option, id) => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    console.log(correctAnswer)

    dispatch(
      answerQuestion({
        questionId: id,
        userAnswer: option
      })
    );

  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  }

  const handleSubmit = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + questions.length);
    const totalScore = questions.reduce((acc, question) => {
      if (question.userAnswer === question.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    // Cập nhật điểm số
    setScore(totalScore);
    console.log("Final Score:", score);

  };

  return (
    <div className="">
      <div className="text-center mb-4 bg-dark py-5">
        <h2 className="text-white">{currentQuestionIndex < questions.length ? "Javascript Quiz" : "Quiz Review"}</h2>
      </div>
      <div></div>
      {currentQuestionIndex < questions.length ? (
        <div className="row">
          <h3 className="card-title">
            Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
          </h3>
          <div className="row ">
            {questions[currentQuestionIndex].options.map(
              (option, optionIndex) => (
                <div key={optionIndex} className="col-6 card alert alert-primary py-4 mx-auto my-3" style={{ width: "45%", borderRadius: "5px" }}>
                  <div className="mx-4">
                    <input
                      type="radio"
                      className="form-check-input"
                      // value={option}
                      checked={questions[currentQuestionIndex].userAnswer === option}
                      onChange={() => handleAnswerSelect(option, questions[currentQuestionIndex].id)}
                    />
                    {option}

                  </div>
                </div>
              )
            )}

          </div>
          <div className="d-flex justify-content-center gap-3 mt-3">

            <button
              className="btn btn-primary"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Prev
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>
          </div>
          <div className="d-flex gap-3">
            <button className="btn btn-info">Quiz</button>
            <button className="btn btn-info">Quiz Review</button>
            <button className="btn btn-info" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h3>Quiz Completed!</h3>
            <p>Your score: {score}</p>
          </div>
          <div className="mt-4">
            {/* <h4 className="text-center text-danger">Quiz Review</h4> */}
            <div className="row">
              {questions.map((question, index) => (
                <div key={index} className="col-12 mb-4">
                  <div
                    className={`card alert ${question.userAnswer === question.correctAnswer
                      ? "alert-success"
                      : "alert-danger"
                      } `}>
                    <div className="card-body">
                      <div className="d-flex">

                        <h5 className="card-title">Question {index + 1}: <span className="fw-normal fs-6">{question.question}</span></h5>
                      </div>
                      <div className="row ">
                        {question.options.map(
                          (option, optionIndex) => (
                            <div className="" key={optionIndex}>
                              <input
                                type="radio"
                                className="form-check-input"
                                // value={option}
                                checked={question.userAnswer === option}
                                onChange={() => handleAnswerSelect(option, question.id)}
                                disabled
                              />
                              {option}

                            </div>
                          )
                        )}

                      </div>
                      <div className="card alert alert-secondary py-2 mt-3">

                        <p className="card-text">
                          Right answer is: <span className="fw-bold">{question.correctAnswer}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
