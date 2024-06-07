import type { PageServerLoad } from "../$types";
import { fail, superValidate } from "sveltekit-superforms";
import { workspaceFormSchema, type WorkspaceFormSchema } from "../schema";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions } from "@sveltejs/kit";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
    let users = await prisma.user.findMany();
    
    return {
        form: await superValidate(zod(workspaceFormSchema)),
        users: users
    }
};

export const actions: Actions = {
    default: async (event) => {
        
        const form = await superValidate(event, zod(workspaceFormSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        form.data.users.forEach(async (user) => {
            console.log(`Storing user: ${user}`);

            await prisma.$transaction(async (txn) => {
                return await txn.workspace.create({
                    data: {
                        name: form.data.name,
                        users: {
                            create: [
                                {
                                    assignedBy: 'Matt',
                                    assignedAt: new Date(),
                                    user: {
                                        connect: {
                                            id: user
                                        }
                                    }
                                }
                            ]
                        }
                    }
                });
            });
        });
    },
  };