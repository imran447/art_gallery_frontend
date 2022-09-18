import { React, useState, useEffect } from "react";

import { Spinner } from "../../../components/spinner/spinner";
import moment from "moment";
import { getFunFactsAPICall } from "../../services/arts";

import Table from "../../../components/table";
import { Button } from "@mui/material";
import Popup from "../../../components/popup/popup";
import environment from "../../../environment";
import AddFunFacts from "./addFunFacts";

const pageSize = 5;
const FunFacts = (props) => {
    const [open, setOpen] = useState(false);
    const [FunFacts, setFunFacts] = useState([]);
    const [arts, setArts] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [editData, setEditData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const handleOpen = () => setOpen(true);
    const { classes } = props;
    const columns = [
        { name: "Name" },
        {
            name: "image",
            label: "Image",
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

    ];

    useEffect(() => {
        getFunFacts(0);
    }, []);



    const getFunFacts = async (offset, loader = true) => {
        if (loader) {
            setIsloading(true);
        }
        let _response = await getFunFactsAPICall(pageSize, offset);
        setIsloading(false);
        if (_response.isSuccess) {
            let _FunFacts = _response.funFacts.map((arts) => {
                const { title, image, createdAt, } =
                    arts;
                let _user = [
                    title,
                    image,
                    moment(createdAt).format("LL"),
                ];
                return _user;
            });
            setTotalCount(_response.total)
            if (_FunFacts.length <= _response.total) {
                let _artist = offset === 0 ? [] : FunFacts;
                setFunFacts([..._artist, ..._FunFacts]);
                setArts([..._artist, ..._FunFacts]);
            }
        }
    };

    const handleClosePopup = () => {
        setOpen(false);
        getFunFacts(0, false);
    };
    const handlePageClick = (index) => {
        setPageIndex((prev) => ++prev);
        getFunFacts(1 + pageIndex, false);
    }

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
                    Add fun fact
                </Button>
            </div>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Table
                        tableData={FunFacts}
                        title={"Fun facts"}
                        columns={columns}
                        pagination={false} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                        <span> {FunFacts.length} of {totalCount}</span>
                        {
                            totalCount > FunFacts.length &&
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
            <Popup isOpen={open} handleClose={handleClosePopup} title={`Add fun fact`}>
                <AddFunFacts handleClose={handleClosePopup} />
            </Popup>
        </>
    );
};

export default FunFacts;
