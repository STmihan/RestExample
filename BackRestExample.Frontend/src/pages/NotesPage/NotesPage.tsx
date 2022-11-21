import * as React from 'react';
import {FC, useState} from 'react';
import {mockNotes, Note} from "../../types/types";
import {NoteComponent} from "../../components/NoteComponent/NoteComponent";
import './NotesPage.scss';
import {CreateNodeComponent} from "../../components/CreateNodeComponent/CreateNodeComponent";

interface Props {

}

export const NotesPage: FC<Props> = () => {
    const [notes, setNotes] = useState<Note[]>(mockNotes);

    const onEdit = (note: Note) => {
      setNotes(notes.map(
        n => {
          if (n.id === note.id) {
            return note
          }
          return n;
        }
      ))
    }

    const onStateChange = (note: Note) => {
      setNotes(notes.map(
        n => {
          if (n === note) {
            return {...n, completed: !n.completed}
          }
          return n;
        }
      ))
    };

    const onDelete = (note: Note) => {
      setNotes(notes.filter(n => n !== note))
    };

    const createNewCard = (note: Note) => {
      if (note.id === null) {
        let newId = notes[notes.length - 1].id
        if (newId !== null) {
          newId = (parseInt(newId) + 1).toString()
          note.id = newId
        }
      }
      setNotes([...notes, note])
    };

    return (
      <div className='notes-page'>
        <div className="container">
          {notes.map(note => (
            <div className="card" key={note.id}>
              <NoteComponent
                note={note}
                editCallback={onEdit}
                onChangeStateCallback={onStateChange}
                onDeleteCallback={onDelete}/>
            </div>
          ))}
          <div className="card">
            <CreateNodeComponent createCardCallback={(note) => createNewCard(note)}/>
          </div>
        </div>
      </div>
    );
  }
;
