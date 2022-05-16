import React, { useState } from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Modal } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 400,
    bgColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export default function ModalCmp({
    open,
    setOpen,
    title,
    setTitle,
    addData
}){

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <input
                        placeholder="Add The Title"
                        className="add-input"
                        onChange={(event) => {
                            setTitle(event.target.value)
                        }}
                        value={title}
                    />

                    <div className="button-container">
                        <button
                            className="add-doc"
                            onClick={addData}
                        >
                            Add
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}