import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import serverUrl from "../constants/config";

const EditProfile = ({ isEdit, setIsEdit, user }) => {
  // defining the input fields
  const [first_name, setfirst_name] = useState(user?.first_name);
  const [last_name, setlast_name] = useState(user?.last_name);
  const [email, setemail] = useState(user?.email);
  const handleEdit = async (e) => {
    e.preventDefault();
    const updatetoastid = toast.loading("Updating Profile...");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.put(
        `${serverUrl}/api/users/${user?.id}`,
        {
          first_name,
          last_name,
          email,
        },
        config
      );
      toast.success("Updated Successfully", { id: updatetoastid });
      console.log(res);
    } catch (error) {
      toast.error(error || "Something went wrong", { id: updatetoastid });
    } finally {
      setIsEdit(false);
    }
  };
  return (
    <Dialog open={isEdit} onClose={() => setIsEdit(false)}>
      <DialogTitle align="center" color="primary">
        Edit Profile
      </DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleEdit}
          style={{ width: "100%", marginTop: "0.5rem" }}
        >
          <TextField
            type="text"
            required
            fullWidth
            label="First Name"
            margin="normal"
            variant="standard"
            value={first_name}
            onChange={(e) => setfirst_name(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Last Name"
            margin="normal"
            variant="standard"
            value={last_name}
            onChange={(e) => setlast_name(e.target.value)}
          />

          

          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            variant="standard"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            reqqired
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Edit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
