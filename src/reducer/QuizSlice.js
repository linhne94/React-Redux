import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "questions",
  initialState: [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
      userAnswer: null,
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Mercury"],
      correctAnswer: "Mars",
      userAnswer: null,
    },
  ],
  reducers: {
    answerQuestion(state, action) {
      const { questionId, userAnswer } = action.payload;
      return state.map(question => {
        if (question.id === questionId) {
          return {
            ...question,
            userAnswer: userAnswer
          };
        }
        return question;
      });
    }
    // console.log(action.payload)
    // return state.map((question) => {
    //   if (question.id === questionId) {
    //     return {
    //       ...question,
    //       userAnswer: userAnswer,
    //     };
    //   }
    //   return question;
    // });
  },
});

export const { answerQuestion } = questionSlice.actions;
export const selectQuizQuestions = (state) => state.questions;
export default questionSlice.reducer;
