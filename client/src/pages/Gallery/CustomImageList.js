/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useGetGalleryQuery } from '../../features/gallery/galleryApiSlice';

const CustomImageList = ({ panelName }) => {
  const { imageList } = useGetGalleryQuery('gallery', {
    selectFromResult: ({ data }) => ({
      imageList: data?.filter((image) => image.groupBy === panelName),
    }),
  });
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      justifyContent="center"
      m={3}
      overflow="scroll"
      maxHeight={1000}
      sx={{
        scrollbarWidth: 'none',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {imageList && (
        <ImageList cols={matchDownMd ? 1 : 2} gap={5} variant="masonry">
          {imageList.map((item) => (
            <ImageListItem key={item.title}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar title={item.title} subtitle={item.author} />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

export default CustomImageList;
