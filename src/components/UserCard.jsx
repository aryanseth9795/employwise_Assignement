import {
  Avatar,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Backdrop,
} from "@mui/material";
import { useState, Suspense, lazy } from "react";

const EditProfile = lazy(() => import("./editPage"));
const UserCard = ({ data, deleteHandle }) => {
  const { id, first_name, last_name, avatar } = data;
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Card
      sx={{
        width: 300,
        height: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Avatar src={avatar} sx={{ width: 80, height: 80, mb: 2 }} />
      <CardContent>
        <Typography variant="h6" component="div" align="center">
          {first_name} {last_name}
        </Typography>
        <Stack direction={"row"} spacing={2} mt={2} justifyContent={"center"}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setIsEdit(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteHandle(id)}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
      {isEdit && (
        <Suspense fallback={<Backdrop open={true} />}>
          <EditProfile isEdit={isEdit} setIsEdit={setIsEdit} user={data} />
        </Suspense>
      )}
    </Card>
  );
};

export default UserCard;
