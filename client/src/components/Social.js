import * as React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton, Box, Tooltip, Zoom } from '@mui/material';

const SocialButtons = ({ color }) => (
  <Box>
    <Tooltip title="Facebook" TransitionComponent={Zoom}>
      <IconButton>
        <FacebookIcon fontSize="small" sx={{ color }} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Instagram" TransitionComponent={Zoom}>
      <IconButton>
        <InstagramIcon fontSize="small" sx={{ color }} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Twitter" TransitionComponent={Zoom}>
      <IconButton>
        <TwitterIcon fontSize="small" sx={{ color }} />
      </IconButton>
    </Tooltip>
  </Box>
);

export default SocialButtons;
