import { User } from "./auth";
import { MCQQuestion } from "./MCQ"
export interface TestPaper{
    id:number,
    title:string,
    description:string,
    share:boolean,
    user:User,
    user_id:number,
    MCQs:MCQQuestion[]
}
export interface TestPaperCreateRequestForm{
    title:string,
    description:string,
    share:boolean
}
export interface TestPaperCreateRequest{
    title:string,
    description:string,
    share:boolean
}
export interface TestPaperUpdateRequest{
    title:string,
    description:string,
    share:boolean
}