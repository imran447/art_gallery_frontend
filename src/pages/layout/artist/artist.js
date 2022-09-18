import { React, useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { Spinner } from "../../../components/spinner/spinner";
import moment from "moment";
import Table from "../../../components/table";
import { getArtistAPICall } from "../../services/arts";
import environment from "../../../environment";
import {Button} from '@mui/material'

const columns = [
  { name: "Artist name" },
  {
    name: "artistImage",
    label: "Artist Image",
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
  "Total arts",
];
const pageSize = 5;

const Artist = (props) => {
  const [open, setOpen] = useState(false);
  const [artist, setArtist] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [editData, setEditData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [totalCount, setTotalCount] = useState(false);
  const handleOpen = () => setOpen(true);
  const { classes } = props;
  const [pageIndex, setPageIndex] = useState(0);


  useEffect(() => {
    getArtist(true, 0);
  }, []);

  const getArtist = async (loader = true, offset) => {
    if (loader) {
      setIsloading(true);
    }

    let _response = await getArtistAPICall(pageSize, offset);
    setIsloading(false);
    if (_response.isSuccess) {

      let _artist = _response.artist.map((arts) => {
        const { artist, count } = arts;
        let _user = [artist.artistName, artist.artistImage, count];
        return _user;
      });
      if (artist.length <= _response.total) {
        let _artistList = offset === 0 ? [] : artist;
        setArtist([..._artistList, ..._artist]);
        setTotalCount(_response.total)
      }
    }
  };
  const handleDeleteRow = async (id) => {
    getArtist(false);
  };
  const handleClosePopup = () => {
    setOpen(false);
    setIsEdit(false);
    getArtist(false);
  };

  const handleEditRow = (id) => {
    let _editData = artist.find((item) => item.id === id);
    setEditData(_editData);
    setIsEdit(true);
    setOpen(true);
  };
  const handlePageClick =(index)=>{
    setPageIndex((prev) => ++prev);
    getArtist(false,1 + pageIndex);
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Table
            tableData={artist}
            title={"Artist"}
            columns={columns}
            pagination={false}
          />
          <div style={{display:'flex' ,justifyContent:'space-between',marginTop:'10px'}}>
            <span> {artist.length} of {totalCount}</span>

           {
            totalCount > artist.length &&
            <Button
              type="button"
              variant="contained"
              onClick={handlePageClick}
              style={{ backgroundColor: "#194B43" }}
              sx={{ mt: 3, mb: 2 }}
            >
              View More
            </Button>

          }
          </div>


        </>
      )}
    </>
  );
};

export default Artist;
