import { User } from "./auth";
import { Vocabulary } from "./vocabulary";

export interface Note{
    id:number,
    title:string,
    description:string,
    vocabularys:Vocabulary[]
    user:User,
    userId:number
}
export interface NoteCreateRequest{
    title:string,
    description:string,
}
export interface NoteUpdateRequest{
    title:string,
    description:string,
}
export interface NoteVocabularysUpdateRequest{
   vocabularys_id:number[] 
}