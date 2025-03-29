import { Box, Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserCard from "../components/UserCard";
import serverUrl from "../constants/config";
import SearchAppBar from "../components/searchAppBar";
const HomePage = () => {
  const [userList, setUserList] = useState([]);
  const [totalPages, settotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const searchHandle = (name) => {
    const searchList = userList.filter((user) => {
      return (user.first_name.toLowerCase().includes(name.toLowerCase())|| user.last_name.toLowerCase().includes(name.toLowerCase()));
    });
    setUserList(searchList);
  };

  async function fetch(pager) {
    try {
      const resp = await axios.get(`${serverUrl}/users?page=${pager}`);
      
      setUserList(resp.data.data);
      settotalPages(resp.data.total);
    } catch (error) {
   
      toast.error(error, "Something went wrong");
    }
  }
  useEffect(() => {
    fetch(page);
  }, [page]);

  const deleteHandle = async (id) => {
    const delId = toast.loading("Deleting ...");
    try {
      const res = await axios.delete(`${serverUrl}/users/${id}`);
      console.log(res);
      toast.success("Deleted Successfully", { id: delId });
      toast.success("And latest data retrieved");
      fetch(page);
    } catch (error) {
      toast.error(error,"Something went wrong! Unable to delete", { id: delId });
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" >
      <SearchAppBar  searchHandle={searchHandle} />
      <Grid container spacing={5} justifyContent="center" minHeight={"80vh"}>
        {userList.length !== 0 ? (
          userList?.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={3}>
              <UserCard key={item.id} data={item} deleteHandle={deleteHandle} />
            </Grid>
          ))
        ) : (
          <h3>{`No users found at page ${page}`}</h3>
        )}
      </Grid>

      <Box display="flex" justifyContent="center" width="95%" mt={3} mb={3}>
        <Pagination
          alignSelf={"center"}
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
