// documents.service.js
import axios from 'axios';

const documentApiUrl = 'https://your-document-api-url.com'; // Cambia por tu URL de la API de documentos
const documentApiKey = 'your-document-api-key'; // Cambia por tu API key

export const convertDocument = async (documentHtml) => {
  const options = {
    method: 'POST',
    url: documentApiUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${documentApiKey}`,
    },
    data: JSON.stringify({
      html: documentHtml,
      sandbox: true,
      orientation: 'vertical',
      page_size: 'A4',
      margin_top: '2cm',
      margin_bottom: '2cm',
      margin_left: '2cm',
      margin_right: '2cm',
    }),
    responseType: 'blob',
  };

  try {
    const response = await axios.request(options);
    const blob = new Blob([response.data], { type: 'application/pdf' });
    return blob;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateDocument = async (htmlContent) => {
  try {
    const document = await convertDocument(htmlContent);
    return document;
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  }
};
