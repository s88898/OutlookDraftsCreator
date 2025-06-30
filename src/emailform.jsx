import React, { useState, useRef } from 'react';
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Paper,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { createEMLWithAttachment, downloadEML } from './utils/emlGenerator.jsx';

export default function EmailForm() {
  const [recipients, setRecipients] = useState(['']);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState(null);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRecipientChange = (index, value) => {
    const updated = [...recipients];
    updated[index] = value;
    setRecipients(updated);
  };

  const addRecipient = () => {
    setRecipients([...recipients, '']);
  };

  const removeRecipient = (index) => {
    const updated = [...recipients];
    updated.splice(index, 1);
    setRecipients(updated);
  };

  const handleFileChange = (event) => {
    const selected = event.target.files[0];
    if (
      selected &&
      (selected.type === 'application/pdf' ||
        selected.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    ) {
      setFile(selected);
    } else {
      alert('Please upload a PDF or Word file only.');
    }
  };

  const inputRef = useRef();

  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const removeFile = () => {
    setFile(null);
  };

  const generateAndDownloadEMLFiles = async () => {
  for (let i = 0; i < recipients.length; i++) {
    const emlContent = await createEMLWithAttachment(recipients[i], subject, body, file);
    const safeTo = recipients[i].replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const safeSubject = subject.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const filename = `${safeTo}_${safeSubject}_${dateStr}.eml`;
    downloadEML(emlContent, filename);
  }
};
    

  const handleSubmit = () => {
    if (
      recipients.some((r) => r.trim() === '' || !isValidEmail(r.trim())) ||
      subject.trim() === '' ||
      body.trim() === ''
    ) {
      alert('Please fill in all fields and make sure all email addresses are valid.');
      return;
    }

    if (!file) {
      alert('Please attach a resume file.');
      return;
    }

    generateAndDownloadEMLFiles();
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Email Sending Form
      </Typography>

      {recipients.map((recipient, index) => (
        <Box key={index} display="flex" alignItems="center" mt={1}>
          <TextField
            fullWidth
            type="email"
            label={`Recipient ${index + 1}`}
            value={recipient}
            onChange={(e) => handleRecipientChange(index, e.target.value)}
            margin="normal"
          />
          {recipients.length > 1 && (
            <IconButton
              onClick={() => removeRecipient(index)}
              color="error"
              sx={{ ml: 1, mt: '8px' }}
              aria-label="Remove recipient"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}

      <Box textAlign="left" mt={1}>
        <IconButton onClick={addRecipient} color="primary" aria-label="Add recipient">
          <AddIcon />
          <Typography ml={1}>Add Recipient</Typography>
        </IconButton>
      </Box>

      <TextField
        fullWidth
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Message Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        multiline
        rows={5}
        margin="normal"
      />

      <Box mt={2}>
        <input
          type="file"
          accept=".pdf,.docx"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <Button variant="outlined" onClick={handleUploadClick}>
          Attach File
        </Button>

        {file && (
          <Box display="flex" alignItems="center" mt={2}>
            <Typography color="text.secondary">
              Selected file: {file.name}
            </Typography>
            <Button
              onClick={removeFile}
              size="small"
              color="error"
              variant="text"
              sx={{ ml: 2 }}
            >
              Remove
            </Button>
          </Box>
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 3 }}
      >
        Send
      </Button>
    </Paper>
  );
}