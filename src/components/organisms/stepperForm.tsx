import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OrganizationSettings from "../pages/OrganisationSettings";
import WelcomeCard from "../molecules/welcome";
import { Container, Grid, Paper } from "@mui/material";
import theme from "../../theme";
import Loading from "../pages/loading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FarmManagement from "../pages/FarmPage";

const steps = ["Welcome", "Add Organisation", "Add Farm & Field"];

const stepDescriptions = [
  "Kickstart the process by creating your organisation.",
  "Click on the ‘Add Farm’ button, enter the required details, then press ‘Save’. Repeat the process to add a Field.",
];
const stepCaption = [
  "Simply click on the Add Organization’ button, enter the required details, then press ‘Save’.",
  "Remember, you have the flexibility to create multiple farms and fields.",
];

export default function StepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    setIsLoading(true);
    navigate("/");
  };

  const stepContent = [
    <WelcomeCard />,
    <Container sx={{ pt: 9 }}>
      <OrganizationSettings />
    </Container>,
    <Container sx={{ pt: 2, ml: 0 }}>
      <FarmManagement />
    </Container>,
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {isLoading === true ? (
        <Loading />
      ) : (
        <>
          <Grid container>
            {activeStep > 0 && (
              <Grid item xs={4}>
                <Paper
                  elevation={3}
                  sx={{
                    marginTop: 15,
                    p: 4,
                    pt: 5,
                    pb: 5,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    alignContent: "center",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.paper,
                  }}
                >
                  <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                    Step {activeStep + 1}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                    {stepDescriptions[activeStep - 1]}
                  </Typography>
                  <Typography variant="caption" sx={{ mt: 2, mb: 1 }}>
                    {stepCaption[activeStep - 1]}
                  </Typography>
                </Paper>
              </Grid>
            )}
            <Grid item xs={activeStep > 0 ? 8 : 12}>
              {stepContent[activeStep]}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  onClick={
                    activeStep === steps.length - 1 ? handleFinish : handleNext
                  }
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
