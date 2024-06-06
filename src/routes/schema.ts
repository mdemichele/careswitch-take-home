import { z } from "zod";
 
export const userFormSchema = z.object({
  name: z.string().min(2).max(50),
});
 
export type UserFormSchema = typeof userFormSchema;

export const workspaceFormSchema = z.object({
    users: z.array(z.string()),
  });
   
  export type workspaceFormSchema = typeof workspaceFormSchema;