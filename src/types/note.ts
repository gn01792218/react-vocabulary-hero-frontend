import { User } from "./auth";
import { Vocabulary } from "./vocabulary";

export interface NoteGroup{
    id:number,
    title:string,
    vocabularys:Vocabulary[]
    user:User
}