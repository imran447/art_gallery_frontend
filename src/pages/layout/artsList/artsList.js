import { React, useState, useEffect } from "react";

import { Spinner } from "../../../components/spinner/spinner";
import moment from "moment";
import Table from "../../../components/table";
import { deleteArtAPICall, getArtsAPICall } from "../../services/arts";
import DeleteIcon from "@mui/icons-material/Delete";
import { handleToastMessage } from "../../../shared/handleToastMessage";
import { Button } from "@mui/material";
import Popup from "../../../components/popup/popup";
import AddArt from "./addArt";
import environment from "../../../environment";

const ArtsList = (props) => {
  const [open, setOpen] = useState(false);
  const [artsList, setArtsList] = useState([]);
  const [arts, setArts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [editData, setEditData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleOpen = () => setOpen(true);
  const { classes } = props;
  const columns = [
    { name: "Art Name" },
    {
      name: "imagePath",
      label: "Art Image",
      options: {
        customBodyRender: (val) => {
          return (
            <img
              src={environment.serverUrl + val}
              style={{ height: "100px", width: "100px" }}
            />
          );
        },
      },
    },
    "Artist name",
    {
      name: "artistImage",
      label: "Artist",
      options: {
        customBodyRender: (val) => {
          return (
            <img
              src={environment.serverUrl + val}
              style={{ height: "100px", width: "100px" }}
            />
          );
        },
      },
    },
    "Created At",
    {
      name: "_id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (_id) => {
          return (
            <div style={{ display: "flex", gridGap: "10px" }}>
              <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(_id)}
              />
            </div>
          );
        },
      },
    },
  ];

  useEffect(() => {
    getArtsList();
  }, []);

  const handleDelete = async (index) => {
    let _result = await deleteArtAPICall(arts[index]._id);
    if (_result.isSuccess) {
      handleToastMessage("success", "Art deleted successfully");
      getArtsList(false);
    }
  };

  const getArtsList = async (loader = true) => {
    if (loader) {
      setIsloading(true);
    }
    let _response = await getArtsAPICall();
    setIsloading(false);
    if (_response.isSuccess) {
      let _artsList = _response.artsList.map((arts) => {
        const { artistImage, artistName, title, imagePath, createdAt, _id } =
          arts;
        let _user = [
          title,
          imagePath,
          artistName,
          artistImage,
          moment(createdAt).format("LL"),
          _id,
        ];
        return _user;
      });
      setArtsList([..._artsList]);
      setArts([..._response.artsList]);
    }
  };

  const handleClosePopup = () => {
    setOpen(false);
    getArtsList(false);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          type="button"
          variant="contained"
          onClick={handleOpen}
          style={{ backgroundColor: "#194B43" }}
          sx={{ mt: 3, mb: 2 }}
        >
          Add art
        </Button>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table tableData={artsList} title={"Arts"} columns={columns} />
      )}
      <Popup isOpen={open} handleClose={handleClosePopup} title={`Add art`}>
        <AddArt handleClose={handleClosePopup} />
      </Popup>
    </>
  );
};

export default ArtsList;