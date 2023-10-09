import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Box, Typography } from '@mui/material';
import { shortenUrlSchema } from '../common/validationSchemas';
import UrlService from '../services/UrlService';
import { observer } from 'mobx-react';

const ShortenForm = observer(() => {
  const [shortUrl, setShortUrl] = useState('');

  const formik = useFormik({
    initialValues: {
      originalUrl: '',
    },
    validationSchema: shortenUrlSchema,
    onSubmit:  async (values) => {
      try {
        const shortened_url = await UrlService.generateShortUrl(values.originalUrl);
        setShortUrl(shortened_url)
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" maxWidth={400} m="auto" p={2}>
        <TextField
          fullWidth
          id="originalUrl"
          name="originalUrl"
          label="URL"
          variant="outlined"
          margin="normal"
          placeholder='Please input your URL'
          {...formik.getFieldProps('originalUrl')}
          error={formik.touched.originalUrl && Boolean(formik.errors.originalUrl)}
          helperText={formik.touched.originalUrl && formik.errors.originalUrl}
        />
        <Button type="submit" variant="contained" color="primary" size="large" fullWidth mt={2}>
          Get Shorten URL
        </Button>

        {shortUrl && (
          <Box mt={2}>
            <Typography variant="subtitle1">Shortened URL:</Typography>
            <a href={`${window.location.origin}/url-shortener-client/${shortUrl}`} target="_blank" rel="noopener noreferrer">
              {`${window.location.origin}/url-shortener-client/${shortUrl}`}
            </a>
          </Box>
        )}
      </Box>
    </form>
  );
});

export default ShortenForm;
