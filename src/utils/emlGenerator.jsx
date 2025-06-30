const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

//
export const createEMLWithAttachment = async (to, subject, body, file) => {
  const boundary = "----=_NextPart_" + Date.now();

  const base64File = await fileToBase64(file);

  return `To: ${to}
Subject: ${subject}
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="${boundary}"

--${boundary}
Content-Type: text/plain; charset="UTF-8"
Content-Transfer-Encoding: 7bit

${body}

--${boundary}
Content-Type: ${file.type}; name="${file.name}"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="${file.name}"

${base64File}
--${boundary}--`;
};


export const downloadEML = (content, filename) => {
  const blob = new Blob([content], { type: 'message/rfc822' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
};