import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface Organization {
  name: string;
  contactInfo: string;
  address: string;
}

const OrganizationSettings: React.FC = () => {
  const [organization, setOrganization] = useState<Organization>({
    name: "ABC Company",
    contactInfo: "contact@example.com",
    address: "123 Main St, City, Country",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Perform save operation here
  };

  const handleInputChange =
    (key: keyof Organization) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setOrganization({ ...organization, [key]: event.target.value });
    };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Organization Settings
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Company Name"
            value={organization.name}
            onChange={handleInputChange("name")}
            fullWidth
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Contact Information"
            value={organization.contactInfo}
            onChange={handleInputChange("contactInfo")}
            fullWidth
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            value={organization.address}
            onChange={handleInputChange("address")}
            fullWidth
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12}>
          {isEditing ? (
            <Button variant="contained" onClick={handleSaveClick}>
              Save
            </Button>
          ) : (
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrganizationSettings;


        // Atoms (EditButton and SaveButton) represent basic UI elements.
        // Molecules (OrganizationForm) combine atoms to form a more complex unit.
        // Organisms (OrganizationSettings) combine molecules and/or atoms to form distinct sections of the UI.
        // Additionally, each component (OrganizationForm, EditButton, SaveButton) is placed in its own file within a components directory for better organization and maintainability.



// import React, { useState } from "react";
// import { Container, Typography, Grid } from "@mui/material";
// import { OrganizationForm, EditButton, SaveButton } from "./components";

// const OrganizationSettings: React.FC = () => {
//   const [organization, setOrganization] = useState<Organization>({
//     name: "ABC Company",
//     contactInfo: "contact@example.com",
//     address: "123 Main St, City, Country",
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     setIsEditing(false);
//     // Perform save operation here
//   };

//   const handleInputChange = (key: keyof Organization) => (value: string) => {
//     setOrganization({ ...organization, [key]: value });
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Organization Settings
//       </Typography>

//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={12}>
//           <OrganizationForm
//             organization={organization}
//             isEditing={isEditing}
//             onInputChange={handleInputChange}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           {isEditing ? (
//             <SaveButton onClick={handleSaveClick} />
//           ) : (
//             <EditButton onClick={handleEditClick} />
//           )}
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default OrganizationSettings;
