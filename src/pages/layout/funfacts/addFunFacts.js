import { Button, CircularProgress, TextField, MenuItem, Select, } from "@mui/material";
import { useState } from "react";
import { handleToastMessage } from "../../../shared/handleToastMessage";
import { addFunFactsAPICall } from "../../services/arts";

const AddFunFacts = ({ handleClose }) => {
  const [title, setTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [artImage, setArtImage] = useState(null);
  const [artistImage, setArtistImage] = useState(null);
  const [artType , setArtType] = useState('');

  const handleChange = (e) => {
    setArtistImage(e.target.files[0]);
  };
  const handleArtistChange = (e) => {
    setArtistImage(e.target.files[0]);
  };

  const handleAddForm = async (e) => {
    e.preventDefault();
    if (title && artistImage) {
      let _fd = new FormData();
      _fd.append("title", title);
      _fd.append("image", artistImage);
      setIsLoading(true);
      let _result = await addFunFactsAPICall(_fd);
      setIsLoading(false);
      if (_result.isSuccess) {
        handleToastMessage("success", "Fun fact add successfully");
        handleClose();
      }
    } else {
      handleToastMessage("error", "Please provide a valid data");
    }
  };

const handleArt =(value)=>{
  setArtType(value);
}

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

       
        <Button variant="basic" fullWidth component="label">
          {artistImage?.name ? artistImage?.name : "Upload image"}

          <input type="file" accept="image/*" hidden onChange={handleChange} />
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
export default AddFunFacts;
