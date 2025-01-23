import { useIndexStore } from "@/stores";

export const generateQuery = (params) => {
    const query = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`;
            } else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
        })
        .join('&');

    const urlParam = `?${query}`;
    return urlParam;
};

export const changeQuery = ( params ) => {
    const useStore = useIndexStore();
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
}
