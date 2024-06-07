import { z } from "zod";
import { type User } from "@prisma/client";
 
export const userFormSchema = z.object({
  name: z.string().min(2).max(50),
});
 
export type UserFormSchema = typeof userFormSchema;

export const workspaceFormSchema = z.object({
    name: z.string().min(2).max(50),
    users: z.array(z.string()),
});
   
export type WorkspaceFormSchema = typeof workspaceFormSchema;