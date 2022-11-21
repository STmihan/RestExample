import * as React from 'react';
import {FC, useEffect} from 'react';
import {NotesPage} from "./pages/NotesPage/NotesPage";
import {OneNotePage} from "./pages/OneNotePage/OneNotePage";
import {Route, Routes, useNavigate} from "react-router-dom";
import {ErrorPage} from "./pages/ErrorPage/ErrorPage";
import {BlankPage} from "./pages/BlankPage/BlankPage";
import {mockNotes} from "./types/types";
import notesStore from "./stores/notesStore";
import {observer} from "mobx-react-lite";

export const App: FC = observer(() => {

  useEffect(() => {
    notesStore.setNotes(mockNotes)
  }, []);


  return (
    <div>
      <Routes>
        <Route path={import.meta.env.BASE_URL + 'notes/:noteId'} element={<OneNotePage/>}/>
        <Route path={import.meta.env.BASE_URL} element={<NotesPage/>}/>
        <Route path={import.meta.env.BASE_URL + 'error-page-404'} element={<ErrorPage statusCode={404}/>}/>
        <Route path={import.meta.env.BASE_URL + 'error-page-500'} element={<ErrorPage statusCode={500}/>}/>
        <Route path={import.meta.env.BASE_URL + '*'} element={<BlankPage/>}/>
      </Routes>
    </div>
  );
});
