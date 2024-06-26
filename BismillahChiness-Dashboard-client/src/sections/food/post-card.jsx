/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { BASE_URL } from 'src/hooks/useGetFoodData';

import UpdateModal from './view/UpdateModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PostCard({ post, index, refetch }) {
  const { _id, imageSrc, title, description, category, price } = post;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/food/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete resource');
      }
      refetch();
      console.log('Resource deleted successfully');
    } catch (error) {
      console.error('Error deleting resource:', error.message);
    }
  };
  const [openModal, setOpenModal] = useState(false);
  const latestPostLarge = index === 0;

  const latestPost = index === 1 || index === 2;
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const renderDescription = (
    <Stack
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        justifyContent: 'space-between',
        ...(latestPostLarge && { typography: 'h5', height: 60 }),
        ...((latestPostLarge || latestPost) && {
          color: 'common.white',
        }),
      }}
    >
      <div>{description}</div>
      <div style={{ textAlign: 'end' }}>{category}</div>
    </Stack>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.disabled',
      }}
    >
      <Stack
        direction="row"
        sx={{
          ...((latestPostLarge || latestPost) && {
            color: 'common.white',
          }),
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="contained" size="small" startIcon={<DeleteIcon />} onClick={handleOpen}>
            Delete
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<BorderColorIcon />}
            onClick={handleOpenModal}
          >
            Update
          </Button>
          <UpdateModal
            id={_id}
            post={post}
            openModal={openModal}
            refetch={refetch}
            handleCloseModal={handleCloseModal}
          />
        </Stack>
      </Stack>
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      alt={title}
      src={imageSrc}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderTitle = (
    <Typography
      variant="caption"
      component="h3"
      sx={{
        mb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        fontSize: '1rem',
        ...((latestPostLarge || latestPost) && {
          color: 'white',
        }),
      }}
    >
      {title}
      <Chip label={`${price} Tk`} color="primary" />
    </Typography>
  );

  return (
    <>
      <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 8 : 4}>
        <Card>
          <Box
            sx={{
              position: 'relative',
              pt: 'calc(100% * 3 / 4)',
              ...((latestPostLarge || latestPost) && {
                pt: 'calc(100% * 4 / 3)',
                '&:after': {
                  top: 0,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[800], 0.42),
                },
              }),
              ...(latestPostLarge && {
                pt: {
                  xs: 'calc(100% * 4 / 3)',
                  sm: 'calc(100% * 3 / 4.66)',
                },
              }),
            }}
          >
            {renderCover}
          </Box>

          <Box
            sx={{
              p: (theme) => theme.spacing(4, 3, 3, 3),
              ...((latestPostLarge || latestPost) && {
                width: 1,
                bottom: 0,
                position: 'absolute',
              }),
            }}
          >
            {renderTitle}

            {renderDescription}

            {renderInfo}
          </Box>
        </Card>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this item?
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => {
                handleDelete(_id, 'food');
                handleClose();
              }}
            >
              Yes, Delete
            </Button>
            <Button variant="contained" size="small" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  index: PropTypes.number,
};
