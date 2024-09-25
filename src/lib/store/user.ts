import {create} from "zustand";
import {UserStruct} from "@/lib/structs/user";


const initialState: UserStruct = {
  id: 0,
  name: "",
  username: "",
  is_paid_member: false,
  rate_id: 0,
  task_color: null,
  timezone: null,
  theme: "light",

}

export type User = {
  user: UserStruct;
}

export type Actions = {
  setTaskColor: (color: string) => void;
  setUser: (user: UserStruct) => void;
}

export const useUserStore = create<User & Actions>()(set =>({
  user: initialState,
  setTaskColor: (taskColor: string) => set(state =>({
    user:{
      ...state.user,
      task_color: taskColor,
    }
  })),
  setUser: (newUser: UserStruct) => set(state =>({
    user:{
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      is_paid_member: newUser.is_paid_member,
      rate_id: newUser.rate_id,
      task_color: newUser.task_color,
      timezone: newUser.timezone,
      theme: newUser.theme,
    }
  }))
}))