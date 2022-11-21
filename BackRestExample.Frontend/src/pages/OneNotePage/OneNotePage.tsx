import * as React from 'react';
import {FC} from 'react';
import './OneNotePage.scss';
import {Note} from "../../types/types";
import {NoteComponent} from "../../components/NoteComponent/NoteComponent";
import {useNavigate, useParams} from "react-router-dom";
import {IconButton} from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import notesStore from "../../stores/notesStore";
import {observer} from "mobx-react-lite";
import {BASE_URL, ERROR_404_URL} from "../../utils/urlUtils";

export const OneNotePage: FC = observer(() => {

  const navigate = useNavigate();
  const noteIdStr = useParams().noteId;
  const notes: Note[] = notesStore.notes;

  React.useEffect(() => {
    if (typeof noteIdStr === "string") {
      if (!notes.some(n => n.id === noteIdStr)) {
        navigate(ERROR_404_URL);
      } else {
        setNote(notes.find(n => n.id === noteIdStr));
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

      <div className="back">
        <IconButton onClick={() => {
          navigate(BASE_URL)
        }}>
          <ArrowBackRoundedIcon/>
        </IconButton>
      </div>
    </div>
  );
});
