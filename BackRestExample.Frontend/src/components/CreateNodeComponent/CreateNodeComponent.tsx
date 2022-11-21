import * as React from 'react';
import {FC, useState} from 'react';
import {Button, Card, CardContent, CardActions, TextField} from "@mui/material";
import './CreateNodeComponent.scss';
import dayjs, {Dayjs} from "dayjs";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Note} from "../../types/types";

interface Props {
  createCardCallback: (note: Note) => void
}

export const CreateNodeComponent: FC<Props> = ({createCardCallback}) => {

  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  function onSubmit(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if(date !== null) {
      const note: Note = {
        id: null,
        title,
        description,
        date: date.format('DD-MM'),
        completed: false,
      }
      createCardCallback(note)
      setTitle('');
      setDescription('')
      setDate(dayjs())
    }
  }

  return (
    <Card
      sx={{minWidth: 350, maxWidth: 350}}
    >
      <CardContent>
        <TextField
          id="filled-search"
          label="Title"
          type="search"
          variant="outlined"
          style={{marginBottom: '1rem'}}
          onChange={(value) => {
            if (value.target.value.length > 20) return
            setTitle(value.target.value)
          }}
          value={title}
        />
        <br/>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={2}
          style={{marginBottom: '1rem'}}
          onChange={(value) => {
            if (value.target.value.length > 40) return
            setDescription(value.target.value)
          }}
          value={description}
        />
        <br/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            value={date}
            onChange={(value) => setDate(value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <br/>
        <Button
          disabled={(date === null || !date.isValid() || title.trim() ==='')}
          style={{marginTop: '1rem'}}
          size="small"
          onClick={onSubmit}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};
