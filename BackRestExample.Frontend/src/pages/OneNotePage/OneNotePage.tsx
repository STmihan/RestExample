import * as React from 'react';
import {FC} from 'react';
import './OneNotePage.scss';
import {mockNotes, Note} from "../../types/types";
import {NoteComponent} from "../../components/NoteComponent/NoteComponent";
import {useNavigate, useParams} from "react-router-dom";

interface Props {

}

export const OneNotePage: FC<Props> = () => {

  const navigate = useNavigate();
  const noteIdStr = useParams().noteId;

  React.useEffect(() => {
    if (typeof noteIdStr === "string") {
      const id = parseInt(noteIdStr);
      if (Number.isNaN(id) || id > mockNotes.length - 1 || id < 0) {
        navigate('/')
      }
    }
  }, [])

  const [note, setNote] = React.useState<Note>();

  return (
    <div className='one-note-page'>
      {
        note === undefined ?
          <div/>
          :
          <NoteComponent note={note}
                         editCallback={n => setNote(n)}
                         onChangeStateCallback={() => setNote({...note, completed: !note.completed})}
                         onDeleteCallback={null}/>
      }
    </div>
  );
};
