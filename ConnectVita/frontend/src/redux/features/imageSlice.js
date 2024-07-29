import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    image:null
  },
  reducers: {
    addImage: (state, action) => {
      state.image = action.payload;
    },
    updateImage: (state, action) => {
      const { id, url } = action.payload;
      const imageToUpdate = state.find(image => image.id === id);
      if (imageToUpdate) {
        imageToUpdate.url = url;
      }
    },
    deleteImage: (state, action) => {
      return state.filter(image => image.id !== action.payload);
    },
  },
});

export const { addImage, updateImage, deleteImage } = imageSlice.actions;

export default imageSlice.reducer;
