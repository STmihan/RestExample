import * as React from 'react';
import {FC, useEffect} from 'react';
import {NotesPage} from "./pages/NotesPage/NotesPage";
import {OneNotePage} from "./pages/OneNotePage/OneNotePage";
import {Route, Routes, useNavigate} from "react-router-dom";
import {ErrorPage} from "./pages/ErrorPage/ErrorPage";
import {BlankPage} from "./pages/BlankPage/BlankPage";

export const App: FC = () => {

  return (
    <div>
      <Routes>
        <Route path='/RestExample/notes/:noteId' element={<OneNotePage/>}/>
        <Route path='/RestExample/' element={<NotesPage/>}/>
        <Route path='/RestExample/error-page-404' element={<ErrorPage statusCode={404}/>}/>
        <Route path='/RestExample/error-page-500' element={<ErrorPage statusCode={500}/>}/>
        <Route path='RestExample/*' element={<BlankPage/>}/>
      </Routes>
    </div>
  );
};
