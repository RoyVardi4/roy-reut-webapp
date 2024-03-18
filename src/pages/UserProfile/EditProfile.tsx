import { FC, useState } from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import UserAPI from "../../api/User";

interface IProps {
  status: string;
  handleFinishedSave: (isSuccess: boolean, message: string) => void;
}

const EditUser: FC<IProps> = ({ handleFinishedSave, status }) => {
  const [statusToUpdate, setStatusToUpdate] = useState(status);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await UserAPI.editUser({status: statusToUpdate});
      handleFinishedSave(true, "Data saved successfully");
    } catch {
      handleFinishedSave(false, "Error :( try again later");
    }
  };

  return (
    <Grid container justifyContent="center" rowGap={5}>
      <Grid item xs={10}>
        <Typography variant="h6" textAlign="center">
          Edit Profile
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Stack direction="row" spacing={4}>
            <Typography variant="caption"></Typography>
            <TextField
              value={statusToUpdate}
              onChange={(e) => setStatusToUpdate(e.target.value)}
              label="Status"
            ></TextField>
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditUser;
