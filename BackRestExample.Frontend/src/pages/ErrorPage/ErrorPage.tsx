import * as React from 'react';
import {FC} from 'react';
import './ErrorPage.scss'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../../utils/urlUtils";

interface Props {
  statusCode: number
}

export const ErrorPage: FC<Props> = ({statusCode}) => {

  const navigate = useNavigate();

  return (
    <div className='error-page'>
      <div className='container'>
        <h1>{statusCode.toString()}</h1>
        <h3>Ops... Something went wrong...</h3>
        <HomeRoundedIcon
          sx={{height: 200, width: 200, marginTop: '3rem', cursor: 'pointer'}}
          onClick={() => {navigate(BASE_URL)}}
        />
      </div>
    </div>
  );
};
