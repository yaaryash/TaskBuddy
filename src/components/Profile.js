import React, { useState, useEffect } from "react";
import { Box, Avatar, Typography, TextField, Button } from "@mui/material";
import { auth, onAuthStateChanged } from "./firebase";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setName(currentUser?.displayName || "");
    });
    return () => unsubscribe();
  }, []);

  return user ? (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Avatar src={user.photoURL} sx={{ width: 80, height: 80, mb: 2 }} />
      <Typography variant="h5">{user.email}</Typography>
      <TextField
        label="Display Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mt: 2, width: "250px" }}
      />
      <Button variant="contained" sx={{ mt: 2 }}>
        Save Changes (Future Update)
      </Button>
    </Box>
  ) : (
    <Typography variant="h6" align="center">
      Please log in first.
    </Typography>
  );
};

export default Profile;
