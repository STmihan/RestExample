import * as React from 'react';
import {useNavigate} from "react-router-dom";

export const BlankPage: React.FC = () => {
  const navigate = useNavigate();
  React.useEffect(() => navigate('/RestExample/error-page-404'), [])
  return <div/>;
};
