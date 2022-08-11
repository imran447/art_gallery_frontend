import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { handleToastMessage } from "../../../shared/handleToastMessage";
import { addArtAPICall } from "../../services/arts";

const AddArt = ({handleClose}) => {
  const [title, setTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [artImage, setArtImage] = useState(null);
  const [artistImage, setArtistImage] = useState(null);

  const handleChange = (e) => {
    setArtImage(e.target.files[0]);
  };
  const handleArtistChange = (e) => {
    setArtistImage(e.target.files[0]);
  };

  const handleAddForm = async (e) => {
    e.preventDefault();
    if (title && artistName && artImage && artistImage) {
      let _fd = new FormData();
      _fd.append("title", title);
      _fd.append("artistImage", artistImage);
      _fd.append("imagePath", artImage);
      _fd.append("artistName", artistName);
      setIsLoading(true);
      let _result = await addArtAPICall(_fd);
      setIsLoading(false);
      if (_result.isSuccess) {
        handleToastMessage("success", "Art add successfully");
        handleClose();
      }
    } else {
      handleToastMessage("error", "Please provide a valid data");
    }
  };

  return (
    <>
      <form onSubmit={handleAddForm}>
        <TextField
          label="title"
          variant="standard"
          fullWidth
          required
          margin="dense"
          style={{ marginBottom: "2rem" }}
          onChange={(value) => setTitle(value.target.value)}
        />
        <TextField
          label="Artist Name"
          variant="standard"
          fullWidth
          required
          margin="dense"
          style={{ marginBottom: "2rem" }}
          onChange={(value) => setArtistName(value.target.value)}
        />

        <Button variant="basic" fullWidth component="label">
          {artImage?.name ? artImage?.name : "Upload art image"}

          <input type="file" accept="image/*" hidden onChange={handleChange} />
        </Button>
        <Button
          variant="basic"
          style={{ marginTop: "10px" }}
          fullWidth
          component="label"
        >
          {artistImage?.name ? artistImage?.name : "Upload artist image"}

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleArtistChange}
          />
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ backgroundColor: "#194B43" }}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? <CircularProgress color="inherit" /> : "Save"}
        </Button>
      </form>
    </>
  );
};
export default AddArt;
