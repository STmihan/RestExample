import * as React from 'react';
import {FC, useState} from 'react';
import {Card, CardContent, CardHeader, IconButton, TextField, Typography} from "@mui/material";
import {Note} from "../../types/types";
import './NoteComponent.scss';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import {date2string, string2date} from "../../utils/dayjsUtils";
import {useNavigate} from "react-router-dom";
import {useLongPress} from "use-long-press";
import {NOTES_URL} from "../../utils/urlUtils";

interface Props {
  note: Note,
  editCallback: (note: Note) => void,
  onChangeStateCallback: (note: Note) => void,
  onDeleteCallback?: ((note: Note) => void) | null,
}

export const NoteComponent: FC<Props> = (
  {
    note,
    editCallback,
    onChangeStateCallback,
    onDeleteCallback
  }) => {

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [date, setDate] = useState<Dayjs | null>(string2date(note.date));

  const bindLongPress = useLongPress(isEditing ? null : () => {
    navigate(NOTES_URL + note.id)
  }, {threshold: 1500})

  const onEditButton = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation()

    if (isEditing) {
      editCallback({...note, date: date2string(date), title, description});
    }

    setIsEditing(!isEditing)
  }

  const onCardClick = () => {
    if (isEditing) {
      return;
    }
    onChangeStateCallback(note);
  }

  const editMode = (
    <>
      <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={2}
        style={{marginBottom: '1rem'}}
        onChange={(value) => {
          if (value.target.value.length > 40) {
            return
          }
          setDescription(value.target.value)
        }}
        value={description}
        onClick={(e) => {e.stopPropagation()}}
      />
      <br/>
      <div onClick={(e) => {e.stopPropagation()}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            value={date}
            onChange={(value) => setDate(value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </>
  );
  const cardMode = (
    <>
      <Typography variant='body2' overflow=''>{note.description}</Typography>
      <br/>
      <Typography variant='overline'>{note.date}</Typography>
    </>
  );
  const titleEdit = (
    <>
      <TextField
        id="filled-search"
        label="Title"
        type="search"
        variant="outlined"
        style={{marginBottom: '1rem'}}
        onChange={(value) => {
          if (value.target.value.length > 20) {
            return
          }
          setTitle(value.target.value)
        }}
        value={title}
      />
    </>
  );

  return (
    <div {...bindLongPress()}>
      <Card
        sx={{minWidth: 350, maxWidth: 350}}
        style={{backgroundColor: note.completed ? '#d5d5d5' : '#fff'}}
        onClick={onCardClick}
      >
        <CardContent>
          <CardHeader
            sx={{padding: 0}}
            title={isEditing ? titleEdit : note.title}
            action={
              <div>
                {(isEditing && onDeleteCallback !== null) ? (
                  <IconButton
                    disabled={date === null || !date.isValid() || title.trim() === ''}
                    onClick={() => onDeleteCallback!(note)}
                  >
                    <DeleteIcon/>
                  </IconButton>
                ) : <div/>}

                <IconButton
                  disabled={date === null || !date.isValid() || title.trim() === ''}
                  onClick={onEditButton}
                >
                  <ModeEditIcon/>
                </IconButton>
              </div>
            }
          />
          {isEditing ? editMode : cardMode}
        </CardContent>
      </Card>
    </div>
  );
};
