const fs = require("fs");
const path = require("path");

const handleFileUpload = (req, res) => {
  const { picFile, picFileType } = req.body;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const uploadedFile = picFile; // Assuming the input name is 'file'
  const targetPath = path.join(
    __dirname,
    `../public/${username}.${picFileType}`
  ); // Adjust the path as needed

  // Save the file to a local directory
  uploadedFile.mv(targetPath, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send("File uploaded successfully!");
  });
};

module.exports = { handleFileUpload };
