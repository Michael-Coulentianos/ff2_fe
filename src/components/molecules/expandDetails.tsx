import * as React from 'react';
import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface ExpandDetailsProps {
  content: string;
  summary?: string | null;
}

const ExpandDetails: React.FC<ExpandDetailsProps> = ({ content, summary }) => {
  const [open, setOpen] = useState(false);

  const renderedSummary = useMemo(() => summary || null, [summary]);

  return (
    <>
      <IconButton aria-label="expand" size="small" onClick={() => setOpen(!open)}>
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
      <Typography variant="body2" component="span" onClick={() => setOpen(!open)}>
        {renderedSummary}
      </Typography>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <Typography variant="body2">{content}</Typography>
        </Box>
      </Collapse>
    </>
  );
};

export default ExpandDetails;
