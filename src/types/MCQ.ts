// 選擇題
export interface MCQQuestion{
   id:number,
   question:string,
   tags:string[],
   solutions:string[],
   share:boolean,
   user_id:number,
   options:MCQQuestionOption[]
}
//請求與回應
export interface MCQQuestionCreateRequestForm{
    question:string,
    solutions:string[],
    tags:string[],
    share:boolean,
    options:MCQQuestionOptionCreateFormData[],
}
export interface MCQQuestionCreateRequest{
    question:string,
    solutions:string[],
    tags:string[],
    share:boolean,
    options:MCQQuestionOptionCreateFormData[],
    test_paper_id:number
}
export interface MCQQuestionUpdateRequest{
    question:string,
    solutions:string[],
    tags:string[],
    share:boolean,
}
export interface MCQQuestionOption{
    id:number,
    content:string,
    is_answer:boolean
}
export interface MCQQuestionOptionCreateFormData{
    content:string,
    is_answer:boolean
}
export interface MCQQuestionOptionUpdateRequest{
    id:number,
    content:string,
    is_answer:boolean
}