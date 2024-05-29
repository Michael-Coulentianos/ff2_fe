import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  PDFViewer,
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

interface Activity {
  name: string;
  date: string;
  cost: number;
}

interface SummaryProps {
  selectCategory: string;
  selectSubCategory: string;
  dateRange: string;
  activities: Activity[];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333", // Dark gray
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666", // Light gray
  },
  table: {
    width: "100%",
    marginTop: 20,
    border: "1px solid #ddd", // Light gray border
    borderRadius: 5, // Rounded corners
    overflow: "hidden", // Hide overflowing borders
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd", // Light gray border
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 12,
    color: "#444", // Slightly darker gray
  },
});

const ActivitySummaryReport: React.FC<SummaryProps> = ({
  dateRange,
  activities,
  selectCategory,
  selectSubCategory,
}) => {
  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      <Typography variant="h5" gutterBottom>
        Activity Summary Report
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {selectCategory + ": " + selectSubCategory}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <b> Date Range:</b> {dateRange}
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: "16px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Activity</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Cost (R)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities?.map((activity, index) => (
              <TableRow key={index}>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell>R{activity.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PDFDownloadLink
        document={
          <MyDocument
            selectCategory={selectCategory}
            selectSubCategory={selectSubCategory}
            dateRange={dateRange}
            activities={activities}
          />
        }
        fileName="activity_summary_report.pdf"
      >
        {({ blob, url, loading, error }) => (
          <Button
            sx={{ marginTop: 1 }}
            variant="contained"
            color="primary"
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Loading..." : "Export as PDF"}
          </Button>
        )}
      </PDFDownloadLink>
    </Paper>
  );
};

const MyDocument: React.FC<SummaryProps> = ({
  selectCategory,
  selectSubCategory,
  dateRange,
  activities,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Activity Summary Report</Text>
      <Text style={styles.subtitle}>Category: {selectCategory}</Text>
      <Text style={styles.subtitle}>
        {selectCategory + " "}Name: {selectSubCategory}
      </Text>
      <Text style={styles.subtitle}>Date Range: {dateRange}</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Activity</Text>
          <Text style={styles.tableCell}>Date</Text>
          <Text style={styles.tableCell}>Cost (R)</Text>
        </View>
        {activities?.map((activity, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{activity.name}</Text>
            <Text style={styles.tableCell}>{activity.date}</Text>
            <Text style={styles.tableCell}>R{activity.cost}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ActivitySummaryReport;
