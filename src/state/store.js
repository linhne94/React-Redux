import { configureStore } from '@reduxjs/toolkit'
import QuestionReducer from '../reducer/QuizSlice'
export const store = configureStore({
    reducer: {
        questions: QuestionReducer
    },
})
export default store;
