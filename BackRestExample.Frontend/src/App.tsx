import * as React from 'react';
import {FC, useEffect} from 'react';
import {NotesPage} from "./pages/NotesPage/NotesPage";
import {OneNotePage} from "./pages/OneNotePage/OneNotePage";
import {Route, Routes} from "react-router-dom";
import {ErrorPage} from "./pages/ErrorPage/ErrorPage";
import {BlankPage} from "./pages/BlankPage/BlankPage";
import {mockNotes} from "./types/types";
import notesStore from "./stores/notesStore";
import {observer} from "mobx-react-lite";
import {BASE_URL, ERROR_404_URL, ERROR_500_URL, NOTES_URL} from "./utils/urlUtils";

export const App: FC = observer(() => {

  useEffect(() => {
    notesStore.setNotes(mockNotes)
  }, []);


  return (
    <div>
      <Routes>
        <Route path={BASE_URL} element={<NotesPage/>}/>
        <Route path={NOTES_URL + ':noteId'} element={<OneNotePage/>}/>
        <Route path={ERROR_404_URL} element={<ErrorPage statusCode={404}/>}/>
        <Route path={ERROR_500_URL} element={<ErrorPage statusCode={500}/>}/>
        <Route path={BASE_URL + '*'} element={<BlankPage/>}/>
      </Routes>
    </div>
  );
});
