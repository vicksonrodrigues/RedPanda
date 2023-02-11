import { styled } from '@mui/material/styles';

import ButtonBase from '@mui/material/ButtonBase';

const ImageButton = styled(ButtonBase)({
  position: 'relative',

  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.1,
    },
    '& .MuiImageTitleHypen-root': {
      opacity: 0,
    },
  },
});

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
});

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.33,
  transition: theme.transitions.create('opacity'),
}));

const ImageTitle = styled('span')(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

export { ImageBackdrop, ImageButton, ImageSrc, ImageTitle };
