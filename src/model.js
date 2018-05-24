export default {
  nextId: 4,
  cards: [
    {
      id: 1,
      question: 'What is a pure function?',
      answer: `It is a function that returns a value, based on it's input and causes no side effects`,
      rank: 0,
      editMode: false,
      showAnswerMode: false,
    },
    {
      id: 2,
      question: 'What is partial application?',
      answer: `Providing a function with fewer arguments than it takes, what's returned is a new function that takes the remaining parameters.`,
      rank: 0,
      editMode: false,
      showAnswerMode: false,
    },
    {
      id: 3,
      question: `Why use immutable data structures?`,
      answer: `To start with, it's the simplest type of data, and...`,
      rank: 0,
      editMode: false,
      showAnswerMode: false,
    },
  ]
}
