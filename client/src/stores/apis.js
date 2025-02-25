import axios from "axios";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const baseUrl = "http://localhost:3000";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

FingerprintJS.load().then(fp => {
  fp.get().then(result => {
    const fingerprint = result.visitorId;
    api.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        config.headers['User-X'] = window.screen.width;
        config.headers['User-Y'] = window.screen.height;
        config.headers['User-Z'] = fingerprint;
      }
      return config;
    });
  });
});

export const validateAPI = async () => {
  const response = await api.get(`/validate`);
  return response;
};

export const loginAPI = async (email, password) => {
  const response = await api.post(`/login`, { email, password });
  return response;
};

export const logoutAPI = async () => {
  const response = await api.get(`/logout`);
  return response;
}

export const routesAPI = async () => {
  const response = await api.get('/router/get');
  return response;
}

export const classAPI = async(query) => {
  const response = await api.get(`/classroom/get/${query}`)
  return response.data;
}

export const classPostAPI = async(payload) => {
  const response = await api.post(`/classroom/create`, payload)
  return response.data;
}

export const classEditAPI = async(payload) => {
  const response = await api.put(`/classroom/edit`, payload)
  return response.data;
}

export const classDeleteAPI = async(payload) => {
  const response = await api.delete(`/classroom/delete/${payload}`)
  return response.data;
}

export const profileAPI = async(query) => {
  const response = await api.get(`/profile/get/${query}`)
  return response.data;
}

export const profilePostAPI = async(payload) => {
  const response = await api.post(`/profile/create`, payload)
  return response.data;
}

export const profileEditAPI = async(payload) => {
  const response = await api.put(`/profile/edit`, payload)
  return response.data;
}

export const profileDeleteAPI = async(payload) => {
  const response = await api.delete(`/profile/delete/${payload}`)
  return response.data;
}

export const userCreateAPI = async(payload) => {
  const response = await api.post(`/user/create`, payload)
  return response.data;
}

export const changePassAPI = async(payload) => {
  const response = await api.post(`/user/change-password`, payload)
  return response.data;
}

export const subjectAPI = async(query) => {
  const response = await api.get(`/subject/get/${query}`)
  return response.data;
}

export const subjectPostAPI = async(payload) => {
  const response = await api.post(`/subject/create`, payload)
  return response.data;
}

export const subjectEditAPI = async(payload) => {
  const response = await api.put(`/subject/edit`, payload)
  return response.data;
}

export const subjectDeleteAPI = async(payload) => {
  const response = await api.delete(`/subject/delete/${payload}`)
  return response.data;
}

export const myProfileAPI = async() => {
  const response = await api.get(`/profile/get/myprofile`)
  return response.data;
}

export const subjectClassAPI = async(query) => {
  const response = await api.get(`/subject-classes/${query}`);
  return response.data
}

export const subjectClassPostAPI = async(payload) => {
  const response = await api.post(`/subject-classes`, payload)
  return response.data;
}

export const subjectClassEditAPI = async(payload) => {
  const response = await api.put(`/subject-classes`, payload)
  return response.data;
}

export const subjectClassDeleteAPI = async(payload) => {
  const response = await api.delete(`/subject-classes/${payload}`)
  return response.data;
}

export const examinationAPI = async(query) => {
  const response = await api.get(`/examination/${query}`);
  return response.data
}

export const examinationPostAPI = async(payload) => {
  const response = await api.post(`/examination`, payload)
  return response.data;
}

export const examinationEditAPI = async(payload) => {
  const response = await api.put(`/examination`, payload)
  return response.data;
}

export const examinationDeleteAPI = async(payload) => {
  const response = await api.delete(`/examination/${payload}`)
  return response.data;
}

export const questionAPI = async(query) => {
  const response = await api.get(`/question/${query}`);
  return response.data
}

export const questionPostAPI = async(payload) => {
  const response = await api.post(`/question`, payload)
  return response.data;
}

export const questionEditAPI = async(payload) => {
  const response = await api.put(`/question`, payload)
  return response.data;
}

export const questionDeleteAPI = async(payload) => {
  const response = await api.delete(`/question/${payload}`)
  return response.data;
}

export const startExaminationAPI = async(payload) => {
  const response = await api.post('/examination/start', payload)
  return response.data;
}

export const saveExaminationAPI = async(payload) => {
  const response = await api.put('/examination/save', payload)
  return response.data;
}

export const submitExaminationAPI = async() => {
  const response = await api.get('/examination/submit')
  return response.data;
}