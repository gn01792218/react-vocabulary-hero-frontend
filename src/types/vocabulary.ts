import { User } from "./auth";
import { Note } from "./note";

export interface Vocabulary {
  id: number;
  spelling: string;
  pronunciation: string;
  definitionMissCount: number;
  spellMissCount: number;
  examples: Example[];
  userId:number
  user?: User;
  notesId:number[]
  notes?: Note[];
}
export interface Example {
  id: number;
  definition: string;
  sentences: Sentence[];
}
export interface Sentence {
    id:number,
    en:string,
    zh:string
}
export interface CreateVocabularyRequest {
  spelling: string;
  pronunciation: string;
}
export interface CreateExampleRequest {
  definition: string;
}
export interface CreateSentenceRequest {
  en:string
  zh:string
}
export interface GetExamplesAndSentencesRequest {
  vocabularyId:number
}
