import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const eventsMediaApi = createApi({
  reducerPath: "eventsMediaApi",
  baseQuery,
  tagTypes: [
    "Event", "EventCategory", "EventRegistration", "EventAttendance", "EventSpeaker",
    "EventVolunteer", "EventSchedule", "EventSession", "EventGallery", "MediaCategory",
    "Media", "Album", "AlbumMedia", "MediaActivityLog", "LiveDonationFeed", "SuccessStory",
    "StoryMedia", "Testimonial", "PressRelease", "News", "Newsletter"
  ],
  endpoints: (builder) => ({
    // Events
    getAllEvents: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/events-media/events", params } : "/events-media/events"),
      providesTags: [{ type: "Event", id: "LIST" }],
    }),
    getEventById: builder.query<any, string | number>({
      query: (id) => `/events-media/events/${id}`,
      providesTags: (r, e, id) => [{ type: "Event", id }],
    }),
    createEvent: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/events-media/events", method: "POST", body: data }),
      invalidatesTags: [{ type: "Event", id: "LIST" }],
    }),
    updateEvent: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/events-media/events/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "Event", id }, { type: "Event", id: "LIST" }],
    }),
    deleteEvent: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/events-media/events/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "Event", id }, { type: "Event", id: "LIST" }],
    }),

    // Media
    getAllMedia: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/events-media/media", params } : "/events-media/media"),
      providesTags: [{ type: "Media", id: "LIST" }],
    }),
    getMediaById: builder.query<any, string | number>({
      query: (id) => `/events-media/media/${id}`,
      providesTags: (r, e, id) => [{ type: "Media", id }],
    }),
    createMedia: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/events-media/media", method: "POST", body: data }),
      invalidatesTags: [{ type: "Media", id: "LIST" }],
    }),
    updateMedia: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/events-media/media/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "Media", id }, { type: "Media", id: "LIST" }],
    }),
    deleteMedia: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/events-media/media/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "Media", id }, { type: "Media", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetAllMediaQuery,
  useGetMediaByIdQuery,
  useCreateMediaMutation,
  useUpdateMediaMutation,
  useDeleteMediaMutation,
} = eventsMediaApi;
