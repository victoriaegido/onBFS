import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Post Type
interface Post {
    id?: number;
    userId: number;
    title: string;
    body: string;
    category: string;
}

// Posts initial state
interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
};

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0c1RsdERmYWZCc1I1YkdpNHJmODM3WVlYRUxLS0NqVFBvdjZmNXRBRVZrIn0.eyJleHAiOjE3OTQ2NDYzNTUsImlhdCI6MTc0MjgxMDQzMiwiYXV0aF90aW1lIjoxNzQyODA2MzU2LCJqdGkiOiIyZWVjNWMxYi1iODI0LTQ1NjQtYmEwZC03Mzc3MjM3ZWNhZTIiLCJpc3MiOiJodHRwczovL2F1dGgtZXUtdGVzdC5nby1haWd1YS5jb20vYXV0aC9yZWFsbXMvZGV2X3Byb2R1Y3QiLCJhdWQiOlsiZ28tYWlndWEtdGVtcGxhdGUiLCJhY2NvdW50Il0sInN1YiI6IjlhYTY0MGMzLTRiOWQtNDZlOC1iNTMxLWIxYmUyODNmZWQzMSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImdvLWFpZ3VhLXNvYyIsInNlc3Npb25fc3RhdGUiOiIwYTg2MWY4Yy04MzBhLTRmNDEtYjNhZS1jZGExYzAyNzQ1NzEiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJnby1haWd1YS10ZW1wbGF0ZSI6eyJyb2xlcyI6WyJBUFBfVEVNUExBVEUiLCJBUFBfVEVNUExBVEVfQURNSU4iLCJBUFBfVEVNUExBVEVfUFVCTElDX0FQSV9BRE1JTiIsIkFQUF9URU1QTEFURV9QVUJMSUNfQVBJIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIGdvYWlndWEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwidXNlcl9uYW1lIjoidmljdG9yaWEuZWdpZG9AaWRyaWNhLmNvbSIsIm5hbWUiOiJWaWN0b3JpYSBFZ2lkbyB8IElkcmljYSIsInByZWZlcnJlZF91c2VybmFtZSI6InZpY3RvcmlhLmVnaWRvQGlkcmljYS5jb20iLCJnaXZlbl9uYW1lIjoiVmljdG9yaWEgRWdpZG8gfCIsImZhbWlseV9uYW1lIjoiSWRyaWNhIiwiZW1haWwiOiJ2aWN0b3JpYS5lZ2lkb0BpZHJpY2EuY29tIn0.g_ya_-Jw9nGe8ARkJbvLSQsn0jvrm5udWNdHPtYnbev4mxSrVrgYsSnss3pZhwALOlvxTgfXRxml_S-Pd2iSltqdtSestDT4YJ6NLDETerYgVXcw7myFs8SNo81eFUG0VE_o3rCPTWEcdLIKFKTy2gXDrDJEw6omttHcHioNGbxUEimfF3Ri16r5QqTlcN8G4brMxY8nO3F8snz8XOwCa1chyHBtpl3b99MYKBB3pSJsxfR2Whp4l6I3-cLubLedXuBEgQoW5olHZWqV-rYh5d4LZWv4gM5wNOnMPlsaHWa8QsOkiGBa2HjkO_Wmwe3rvn2tEYIVvG0oVs4iTM785Q';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:20001/post',
    prepareHeaders: (headers) => {
        if (token) {
            headers.set('Authorization', ` Bearer ${token}`)
        }
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery,
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/getAll',
            providesTags: ['Post'],
        }),
        getPost: builder.query<Post, number>({
            query: (id) => `/${id}`,
            providesTags: ['Post'],
        }),
        getPostsByUser: builder.query<Post[], number>({
            query: (userId) => `/user/${userId}`,
            providesTags: ['Post'],
        }),
        createPost: builder.mutation<Post, Post>({
            query: (post) => ({
                url: '/create',
                method: 'POST',
                body: post,
            }),
            invalidatesTags: ['Post'],
        }),
        updatePost: builder.mutation<Post, {id: number, post: Post}>({
            query: ({ id, post }) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: post,
            }),
            invalidatesTags: ['Post'],
        }),
        deletePost: builder.mutation<void, number>({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Post'],
        }),
        }),
    });

export const { useGetPostsQuery,
    useGetPostQuery,
    useGetPostsByUserQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation, } = postApi;