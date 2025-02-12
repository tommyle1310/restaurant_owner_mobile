import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  accessToken: string | null;
  user_id: string | null;
  email: string | null;
  user_type: string[] | null;
  app_preferences: object | null;
  owner_id: string | null;
  restaurant_id: string | null;
  address: string | null;
  restaurant_name: string | null;
  contact_email: Array<{
    title: string;
    is_default: boolean;
    email: string;
    _id: string;
  }> | null;
  contact_phone: string[] | null;
  avatar: {
    url: string;
    key: string;
  } | null;
  images_gallery: string[] | null;
  status: {
    is_open: boolean;
    is_active: boolean;
    is_accepted_orders: boolean;
  } | null;
  promotions: string[] | null;
  ratings: object | null;
  specialize_in: string[] | null;
  opening_hours: {
    mon: object;
    tue: object;
    wed: object;
    thu: object;
    fri: object;
    sat: object;
    sun: object;
  } | null;
}

// Initialize the state
const initialState: AuthState = {
  user_id: null,
  restaurant_id: null,
  accessToken: null,

  email: null,
  user_type: null,
  app_preferences: {},
  owner_id: null,
  address: null,
  restaurant_name: null,
  contact_email: [],
  contact_phone: [],
  avatar: null,
  images_gallery: [],
  status: null,
  promotions: [],
  ratings: {},
  specialize_in: [],
  opening_hours: {
    mon: {},
    tue: {},
    wed: {},
    thu: {},
    fri: {},
    sat: {},
    sun: {},
  },
};

export const loadTokenFromAsyncStorage = createAsyncThunk(
  "auth/loadToken",
  async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    const restaurant_id = await AsyncStorage.getItem("restaurant_id");
    const accessToken = await AsyncStorage.getItem("accessToken");
    const email = await AsyncStorage.getItem("email");
    const user_type = await AsyncStorage.getItem("user_type");
    const app_preferences = await AsyncStorage.getItem("app_preferences");
    const owner_id = await AsyncStorage.getItem("owner_id");
    const address = await AsyncStorage.getItem("address");
    const restaurant_name = await AsyncStorage.getItem("restaurant_name");
    const contact_email = await AsyncStorage.getItem("contact_email");
    const contact_phone = await AsyncStorage.getItem("contact_phone");
    const created_at = await AsyncStorage.getItem("created_at");
    const updated_at = await AsyncStorage.getItem("updated_at");
    const avatar = await AsyncStorage.getItem("avatar");
    const images_gallery = await AsyncStorage.getItem("images_gallery");
    const status = await AsyncStorage.getItem("status");
    const promotions = await AsyncStorage.getItem("promotions");
    const ratings = await AsyncStorage.getItem("ratings");
    const specialize_in = await AsyncStorage.getItem("specialize_in");
    const opening_hours = await AsyncStorage.getItem("opening_hours");

    return {
      user_id,
      restaurant_id,
      email,
      user_type: user_type ? JSON.parse(user_type) : [],
      app_preferences: app_preferences ? JSON.parse(app_preferences) : {},
      owner_id,
      accessToken,
      address,
      restaurant_name,
      contact_email: contact_email ? JSON.parse(contact_email) : [],
      contact_phone: contact_phone ? JSON.parse(contact_phone) : [],
      created_at: created_at ? Number(created_at) : null,
      updated_at: updated_at ? Number(updated_at) : null,
      avatar: avatar ? JSON.parse(avatar) : null,
      images_gallery: images_gallery ? JSON.parse(images_gallery) : [],
      status: status ? JSON.parse(status) : null,
      promotions: promotions ? JSON.parse(promotions) : [],
      ratings: ratings ? JSON.parse(ratings) : {},
      specialize_in: specialize_in ? JSON.parse(specialize_in) : [],
      opening_hours: opening_hours
        ? JSON.parse(opening_hours)
        : {
            mon: {},
            tue: {},
            wed: {},
            thu: {},
            fri: {},
            sat: {},
            sun: {},
          },
    };
  }
);

export const saveTokenToAsyncStorage = createAsyncThunk(
  "auth/saveToken",
  async (data: AuthState) => {
    await AsyncStorage.setItem("user_id", data.user_id!);
    await AsyncStorage.setItem("restaurant_id", data.restaurant_id!);
    await AsyncStorage.setItem("accessToken", data.accessToken!);
    await AsyncStorage.setItem("email", data.email!);
    await AsyncStorage.setItem("user_type", JSON.stringify(data.user_type));
    await AsyncStorage.setItem(
      "app_preferences",
      JSON.stringify(data.app_preferences)
    );
    await AsyncStorage.setItem("owner_id", data.owner_id!);
    await AsyncStorage.setItem("address", data.address!);
    await AsyncStorage.setItem("restaurant_name", data.restaurant_name!);
    await AsyncStorage.setItem(
      "contact_email",
      JSON.stringify(data.contact_email)
    );
    await AsyncStorage.setItem(
      "contact_phone",
      JSON.stringify(data.contact_phone)
    );
    await AsyncStorage.setItem("avatar", JSON.stringify(data.avatar));
    await AsyncStorage.setItem(
      "images_gallery",
      JSON.stringify(data.images_gallery)
    );
    await AsyncStorage.setItem("status", JSON.stringify(data.status));
    await AsyncStorage.setItem("promotions", JSON.stringify(data.promotions));
    await AsyncStorage.setItem("ratings", JSON.stringify(data.ratings));
    await AsyncStorage.setItem(
      "specialize_in",
      JSON.stringify(data.specialize_in)
    );
    await AsyncStorage.setItem(
      "opening_hours",
      JSON.stringify(data.opening_hours)
    );

    return data;
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    await AsyncStorage.removeItem("user_id");
    await AsyncStorage.removeItem("restaurant_id");
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("user_type");
    await AsyncStorage.removeItem("app_preferences");
    await AsyncStorage.removeItem("owner_id");
    await AsyncStorage.removeItem("address");
    await AsyncStorage.removeItem("restaurant_name");
    await AsyncStorage.removeItem("contact_email");
    await AsyncStorage.removeItem("contact_phone");
    await AsyncStorage.removeItem("avatar");
    await AsyncStorage.removeItem("images_gallery");
    await AsyncStorage.removeItem("status");
    await AsyncStorage.removeItem("promotions");
    await AsyncStorage.removeItem("ratings");
    await AsyncStorage.removeItem("specialize_in");
    await AsyncStorage.removeItem("opening_hours");

    dispatch(clearAuthState());
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      const {
        user_id,
        restaurant_id,
        email,
        accessToken,
        user_type,
        app_preferences,
        owner_id,
        address,
        restaurant_name,
        contact_email,
        contact_phone,
        created_at,
        updated_at,
        avatar,
        images_gallery,
        status,
        promotions,
        ratings,
        specialize_in,
        opening_hours,
        iat,
        exp,
      } = action.payload;
      state.user_id = user_id;
      state.email = email;
      state.user_type = user_type;
      state.restaurant_id = restaurant_id;
      state.accessToken = accessToken;
      state.app_preferences = app_preferences;
      state.owner_id = owner_id;
      state.address = address;
      state.restaurant_name = restaurant_name;
      state.contact_email = contact_email;
      state.contact_phone = contact_phone;
      state.avatar = avatar;
      state.images_gallery = images_gallery;
      state.status = status;
      state.promotions = promotions;
      state.ratings = ratings;
      state.specialize_in = specialize_in;
      state.opening_hours = opening_hours;
    },

    clearAuthState: (state) => {
      state.user_id = null;
      state.email = null;
      state.accessToken = null;
      state.restaurant_id = null;
      state.user_type = [];
      state.app_preferences = {};
      state.owner_id = null;
      state.address = null;
      state.restaurant_name = null;
      state.contact_email = [];
      state.contact_phone = [];
      state.avatar = null;
      state.images_gallery = [];
      state.status = null;
      state.promotions = [];
      state.ratings = {};
      state.specialize_in = [];
      state.opening_hours = {
        mon: {},
        tue: {},
        wed: {},
        thu: {},
        fri: {},
        sat: {},
        sun: {},
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTokenFromAsyncStorage.fulfilled, (state, action) => {
        const {
          user_id,
          restaurant_id,
          email,
          user_type,
          app_preferences,
          owner_id,
          accessToken,
          address,
          restaurant_name,
          contact_email,
          contact_phone,
          avatar,
          images_gallery,
          status,
          promotions,
          ratings,
          specialize_in,
          opening_hours,
        } = action.payload;

        state.user_id = user_id;
        state.email = email;
        state.user_type = user_type;
        state.restaurant_id = restaurant_id;
        state.app_preferences = app_preferences;
        state.accessToken = accessToken;
        state.owner_id = owner_id;
        state.address = address;
        state.restaurant_name = restaurant_name;
        state.contact_email = contact_email;
        state.contact_phone = contact_phone;
        state.avatar = avatar;
        state.images_gallery = images_gallery;
        state.status = status;
        state.promotions = promotions;
        state.ratings = ratings;
        state.specialize_in = specialize_in;
        state.opening_hours = opening_hours;
      })
      .addCase(saveTokenToAsyncStorage.fulfilled, (state, action) => {
        const {
          user_id,
          email,
          user_type,
          restaurant_id,
          app_preferences,
          owner_id,
          accessToken,
          address,
          restaurant_name,
          contact_email,
          contact_phone,
          avatar,
          images_gallery,
          status,
          promotions,
          ratings,
          specialize_in,
          opening_hours,
        } = action.payload;

        state.user_id = user_id;
        state.email = email;
        state.user_type = user_type;
        state.restaurant_id = restaurant_id;
        state.accessToken = accessToken;
        state.app_preferences = app_preferences;
        state.owner_id = owner_id;
        state.address = address;
        state.restaurant_name = restaurant_name;
        state.contact_email = contact_email;
        state.contact_phone = contact_phone;
        state.avatar = avatar;
        state.images_gallery = images_gallery;
        state.status = status;
        state.promotions = promotions;
        state.ratings = ratings;
        state.specialize_in = specialize_in;
        state.opening_hours = opening_hours;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user_id = null;
        state.email = null;
        state.accessToken = null;
        state.restaurant_id = null;
        state.user_type = [];
        state.app_preferences = {};
        state.owner_id = null;
        state.address = null;
        state.restaurant_name = null;
        state.contact_email = [];
        state.contact_phone = [];
        state.avatar = null;
        state.images_gallery = [];
        state.status = null;
        state.promotions = [];
        state.ratings = {};
        state.specialize_in = [];
        state.opening_hours = {
          mon: {},
          tue: {},
          wed: {},
          thu: {},
          fri: {},
          sat: {},
          sun: {},
        };
      });
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
