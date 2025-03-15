import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../util/supabaseClient';

export const storageApi = createApi({
  reducerPath: 'storageApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    uploadThumbnail: builder.mutation<{ url: string }, File>({
      queryFn: async (file) => {
        try {
          const { data, error } = await supabase.storage
            .from("project_images")
            .upload(`thumbnail/${file.name}`, file, { upsert: true });
    
          if (error) return { error };
  
          const { data: { publicUrl } } = supabase.storage
            .from("project_images")
            .getPublicUrl(data.path);

          return { data: { url: publicUrl } };
        } catch (error) {
          return { error };
        }
      },
    }),
    uploadProjectFile: builder.mutation<{ url: string }, File>({
      queryFn: async (file) => {
        try {
          const { data, error } = await supabase.storage
            .from("project_images")
            .upload(`projects/${file.name}`, file, { upsert: true });
    
          if (error){ 
            console.log("아 ㅈㄴ하기싫다");
            console.log(error);
            return { error };}
  
          const { data: { publicUrl } } = supabase.storage
            .from("project_images")
            .getPublicUrl(data.path);

          return { data: { url: publicUrl } };
        } catch (error) {
          
          console.log(error);
          return { error };
        }
      },
    }),
    uploadPostFile: builder.mutation<{ url: string }, File>({
      queryFn: async (file) => {
        try {
          const { data, error } = await supabase.storage
            .from("post_images")
            .upload(`posts/${file.name}`, file, { upsert: true });
    
          if (error) return { error };
  
          const { data: { publicUrl } } = supabase.storage
            .from("post_images")
            .getPublicUrl(data.path);

          return { data: { url: publicUrl } };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
useUploadThumbnailMutation,
useUploadProjectFileMutation,
useUploadPostFileMutation
} = storageApi;
