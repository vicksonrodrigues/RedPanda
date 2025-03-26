import * as React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton, Box, Tooltip, Zoom } from '@mui/material';

const SocialButtons = ({ color }) => (
  <Box>
    <Tooltip title="Facebook" TransitionComponent={Zoom}>
      <IconButton>
        <FacebookIcon sx={{ color, fontSize: '16px' }} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Instagram" TransitionComponent={Zoom}>
      <IconButton>
        <InstagramIcon sx={{ color, fontSize: '16px' }} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Twitter" TransitionComponent={Zoom}>
      <IconButton>
        <TwitterIcon sx={{ color, fontSize: '16px' }} />
      </IconButton>
    </Tooltip>
  </Box>
);

export default SocialButtons;
