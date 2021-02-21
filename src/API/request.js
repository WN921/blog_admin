import { axiosInstance } from "./config";

export const login = (data) => {
    return axiosInstance.post("/api/user/login", data);
}

export const getLabelList = () => {
    return axiosInstance.get("/api/label");
}

export const addBlog = (data) => {
    return axiosInstance.post("/api/blog", data);
}

export const updateBlog = (data) => {
    return axiosInstance.patch("/api/blog", data);
}

export const getBlogList = (userId) => {
    return axiosInstance.get(`/api/blog?userId=${userId}`);
}

export const deleteBlog = (blogId) => {
    return axiosInstance.delete(`/api/blog/${blogId}`);
}

export const getBlogById = (blogId) => {
    return axiosInstance.get(`/api/blog/${blogId}`);
}

export const uploadFile = (file) => {
    let form = new FormData();
    form.append('file', file);
    return axiosInstance.post(`/uploadfile`, form);
}