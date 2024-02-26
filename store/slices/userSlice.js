import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  company: null,
  name: null,
  gender: null,
  phoneNumber: null,
  address: null,
  longitude: null,
  latitude: null,
  email: null,
  employeeNo: null,
  picture: null,
  pictureData: null,
  verified: false,
  available: false,
  shiftAccess: false,
  branch: null,
  phoneCode: null,
  role: null,
  state: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        id,
        company,
        name,
        gender,
        phoneNumber,
        address,
        longitude,
        latitude,
        email,
        employeeNo,
        picture,
        pictureData,
        verified,
        available,
        shiftAccess,
        branch,
        phoneCode,
        role,
      } = action.payload;

      state.id = id;
      state.company = company;
      state.name = name;
      state.gender = gender;
      state.phoneNumber = phoneNumber;
      state.address = address;
      state.longitude = longitude;
      state.latitude = latitude;
      state.email = email;
      state.employeeNo = employeeNo;
      state.picture = picture;
      state.pictureData = pictureData;
      state.verified = verified;
      state.available = available;
      state.shiftAccess = shiftAccess;
      state.branch = branch;
      state.phoneCode = phoneCode;
      state.role = role;
    },
    clearUser: (state) => {
      state.id = null;
      state.company = null;
      state.name = null;
      state.gender = null;
      state.phoneNumber = null;
      state.address = null;
      state.longitude = null;
      state.latitude = null;
      state.email = null;
      state.employeeNo = null;
      state.picture = null;
      state.pictureData = null;
      state.verified = false;
      state.available = false;
      state.shiftAccess = false;
      state.branch = null;
      state.phoneCode = null;
      state.role = null;
    },
    updateLocation: (state, action) => {
      const { longitude, latitude } = action.payload;
      state.longitude = longitude;
      state.latitude = latitude;
    },
    updateState: (state, action) => {
      const { userState } = action.payload;
      state.state = userState;
    },
  },
});

export const { setUser, clearUser, updateLocation, updateState } =
  userSlice.actions;

export default userSlice.reducer;
