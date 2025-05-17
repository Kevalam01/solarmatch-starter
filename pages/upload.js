
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [postalCode, setPostalCode] = useState('');
  const [usage, setUsage] = useState('');
  const [status, setStatus] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !postalCode || !usage) {
      setStatus('Please fill in all fields.');
      return;
    }

    const fileName = `${Date.now()}_${file.name}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from('bills')
      .upload(fileName, file);

    if (storageError) {
      setStatus('File upload failed.');
      console.error(storageError);
      return;
    }

    const fileUrl = `https://bwmgcmntkgokqsazzlfy.supabase.co/storage/v1/object/public/bills/${fileName}`;

    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ 
        postal_code: postalCode, 
        usage_kwh: parseInt(usage), 
        bill_url: fileUrl,
        address_masked: postalCode 
      }]);

    if (dbError) {
      setStatus('Database save failed.');
      console.error(dbError);
    } else {
      setStatus('Bill uploaded successfully!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Upload Electricity Bill</h1>
      <form onSubmit={handleUpload} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Monthly Usage (kWh)"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Upload
        </button>
        {status && <p className="text-sm text-center mt-2">{status}</p>}
      </form>
    </div>
  );
}
