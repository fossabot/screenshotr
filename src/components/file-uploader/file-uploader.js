import React, { useEffect } from 'react';

const handleFiles = (files, isMultiple, callback) => {
  // Process each file
  const allFiles = [];
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];

    // Make new FileReader
    const reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: file.size,
        base64: reader.result,
        file
      };

      // Push it to the state
      allFiles.push(fileInfo);

      // If all files have been processed
      if (allFiles.length === files.length) {
        // Apply Callback function
        if (isMultiple) callback(allFiles);
        else callback(allFiles[0]);
      }
    };
  }
};

export default function FileUploader({
  multiple = false,
  onDone = () => {},
  style = {},
  children,
  className = '',
  accept = '*',
  disabled = false
}) {
  useEffect(() => {
    const handlePaste = e => {
      const { items } = e.clipboardData;
      const files = [];
      for (let i = 0; i < items.length; i += 1) {
        const file = items[i].getAsFile();
        if (file) files.push(items[i].getAsFile());
      }
      if (files.length) handleFiles(files, multiple, onDone);
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [multiple, onDone]);

  return (
    <label
      style={{
        cursor: 'pointer',
        ...style
      }}
      className={className}
    >
      <input
        type="file"
        onChange={e => handleFiles(e.target.files, multiple, onDone)}
        multiple={multiple}
        style={{
          width: 0.1,
          height: 0.1,
          opacity: 0,
          overflow: 'hidden',
          position: 'absolute',
          zIndex: -1
        }}
        accept={accept}
        disabled={disabled}
      />
      {children}
    </label>
  );
}
