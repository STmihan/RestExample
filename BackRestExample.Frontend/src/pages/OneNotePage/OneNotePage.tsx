import * as React from 'react';
import {FC} from 'react';
import './OneNotePage.scss';
import {mockNotes, Note} from "../../types/types";
import {NoteComponent} from "../../components/NoteComponent/NoteComponent";
import {useNavigate, useParams} from "react-router-dom";
import {IconButton} from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

interface Props {

}

export const OneNotePage: FC<Props> = () => {

  const navigate = useNavigate();
  const noteIdStr = useParams().noteId;

  React.useEffect(() => {
    if (typeof noteIdStr === "string") {
      if (!mockNotes.some(n => n.id === noteIdStr)) {
        navigate(import.meta.env.BASE_URL)
      } else {
        setNote(mockNotes.find(n => n.id))
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
          navigate(import.meta.env.BASE_URL)
        }}>
          <ArrowBackRoundedIcon/>
        </IconButton>
      </div>
    </div>
  );
};
