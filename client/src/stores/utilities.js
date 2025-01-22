import { useIndexStore } from "@/stores";

export const generateQuery = (params) => {
    const useStore = useIndexStore();
    let newQuery = "";

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    if (key in useStore.$state) {
                        useStore.$state[key] = item;
                    }
                });
            } else {
                if (key in useStore.$state) {
                    useStore.$state[key] = value;
                }
            }
        }
    });

    newQuery = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`;
            } else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
        })
        .join('&');

    const urlParam = newQuery.length === 0 ? "" : `?${newQuery}`;
    return urlParam;
};
