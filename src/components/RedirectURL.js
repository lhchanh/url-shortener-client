import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UrlService from '../services/UrlService';
import { Box, Link } from '@mui/material';
import AuthService from '../services/AuthService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { observer } from 'mobx-react';

const RedirectURL = observer(() => {
  const { shortUrl } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const original_url = await UrlService.redirect(shortUrl)
        window.location.href = original_url;
      } catch (error) {
        history.push('/shorten-url')
      }
    };
    if(AuthService.isAuthenticated()){
      fetchOriginalUrl();
    }
    
  }, [shortUrl]);

  return <Box p={2}>
      {AuthService.isAuthenticated() ? 'Redirecting...' : (
        <Box> You are not logged. <Link onClick={() => history.push('/login')}>Login now</Link></Box>
      )}
    </Box>;
});

export default RedirectURL;
