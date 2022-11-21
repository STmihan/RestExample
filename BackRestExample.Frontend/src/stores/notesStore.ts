import {makeAutoObservable} from 'mobx';
import {Note} from "../types/types";

class NotesStore {
  notes: Note[] = []
  constructor() {
    makeAutoObservable(this)
  }

  setNotes(notes: Note[]) {
    this.notes = notes
  }
}

export default new NotesStore()
