/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import useGetFoodData, { BASE_URL } from 'src/hooks/useGetFoodData';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import FoodCategory from './food-category';

export default function FoodView() {
  const [foodData, refetch] = useGetFoodData('/api/food');
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(Number);
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [category, setCategory] = useState('');

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImgSrcChange = (event) => {
    setImageSrc(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddFood = async () => {
    try {
      const newFoodData = {
        title,
        price,
        description,
        imageSrc,
        category,
        available: true,
      };
      const response = await fetch(`${BASE_URL}/api/food`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFoodData),
      });
      if (!response.ok) {
        throw new Error('Failed to add food. Please try again later.');
      }
      console.log('Food added successfully:', newFoodData);
      refetch();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding food:', error.message);
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Food</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenModal}
        >
          Add Food
        </Button>
      </Stack>
      <FoodCategory />
      <Grid container spacing={3}>
        {foodData.map((post, index) => (
          <PostCard key={post._id} post={post} index={index} refetch={refetch} />
        ))}
      </Grid>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Container>
          <Stack
            spacing={3}
            p={4}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 4,
              width: 400,
            }}
          >
            <Typography variant="h6">Add Food</Typography>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
            />
            <TextField
              label="Price"
              variant="outlined"
              value={price}
              onChange={handlePriceChange}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={handleDescriptionChange}
            />
            <TextField
              label="Image Source"
              variant="outlined"
              value={imageSrc}
              onChange={handleImgSrcChange}
            />
            <TextField
              label="Category"
              variant="outlined"
              value={category}
              onChange={handleCategoryChange}
            />
            <Button variant="contained" onClick={handleAddFood}>
              Add
            </Button>
          </Stack>
        </Container>
      </Modal>
    </Container>
  );
}
