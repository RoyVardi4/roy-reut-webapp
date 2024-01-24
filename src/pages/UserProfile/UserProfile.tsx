import { useQuery } from "react-query";
import { IUser } from "../../interfaces/User";
import UserAPI from "../../api/User";
import { useUser } from "../../context/user";
import AddProfileImage from "./AddProfileImage";
import {
  Alert,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Dialog,
  IconButton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { CameraAlt as Camera, Edit } from "@mui/icons-material";
import { useState } from "react";

const UserProfile = ({}) => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [sackbarProps, setSnackbarProps] = useState<{
    isSuccess: boolean;
    message: string;
  }>();

  const {
    isLoading,
    error,
    data: user,
    refetch,
  } = useQuery<IUser, Error>(["UserInfo"], () => UserAPI.getUserInfo());

  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src =
      "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const handleFinishedSave = (isSuccess: boolean, message: string) => {
    setIsImageOpen(false);
    setIsSnackbarOpen(true);
    setSnackbarProps({
      isSuccess: isSuccess,
      message: message,
    });
  };

  return (
    <Card>
      <CardHeader title={user?.email} subheader={user?.status}></CardHeader>
      <CardMedia
        component="img"
        height="194"
        image={`${
          import.meta.env.VITE_SERVER_URL || "http://localhost:3000/api/"
        }users/myPhoto/${useUser().user?.email}?${new Date().getTime()}`}
        onError={handleImageError}
        alt={user?.email}
        title={user?.email}
      ></CardMedia>
      <CardActions>
        <Tooltip title="Upload a profile picture">
          <IconButton onClick={() => setIsImageOpen(true)}>
            <Camera />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit my status">
          <IconButton>
            <Edit />
          </IconButton>
        </Tooltip>
      </CardActions>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isSnackbarOpen}
        autoHideDuration={6000}
        // onClose={handleCloseSnackbar}
      >
        <Alert
          // onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {sackbarProps?.message}
        </Alert>
      </Snackbar>
      <Dialog open={isImageOpen} onClose={() => setIsImageOpen(false)}>
        <AddProfileImage
          handleFinishedSave={handleFinishedSave}
          userEmail={user?.email}
        />
      </Dialog>
    </Card>
  );
};

export default UserProfile;
