// indexStore.js
import { defineStore } from "pinia";
import { state } from '@/stores/states';
import { actions } from '@/stores/actions';

export const useIndexStore = defineStore("index", () => {
  return {
    ...state,
    ...actions,
  };
});