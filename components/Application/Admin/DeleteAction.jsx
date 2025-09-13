import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemIcon, MenuItem } from "@mui/material";

const DeleteAction = ({ handleDelete, row, deleteType }) => {
  return (
    <MenuItem
      key="edit"
      onClick={() => handleDelete([row.original._id],deleteType)}
    >
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      Delete
    </MenuItem>
  );
};

export default DeleteAction;
