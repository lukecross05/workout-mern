const path = require("path");

const handleFileUpload = (req, res) => {
  const { picFile, picFileType } = req.body;

  //check if files were uploaded.
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  //get the uploaded file.
  const uploadedFile = picFile;
  //define target path.
  const targetPath = path.join(
    __dirname,
    `../public/${username}.${picFileType}`
  );

  //save the file to directory.
  uploadedFile.mv(targetPath, (error) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.status(200).send("dile uploaded successfully");
  });
};

module.exports = { handleFileUpload };
