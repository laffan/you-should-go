import { create } from "zustand";

const useStore = create((set, get) => ({
 userName: '',
  setUserName: (name) => set({ userName: name }),
}));

export default useStore