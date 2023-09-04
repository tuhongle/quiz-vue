export interface categoryListType {
    id: number,
    name: string
}

export interface question {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}