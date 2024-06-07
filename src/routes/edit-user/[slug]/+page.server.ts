import type { PageServerLoad } from "../../user/$types";
import { fail, superValidate } from "sveltekit-superforms";
import { userFormSchema, type UserFormSchema } from "../../schema";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions } from "@sveltejs/kit";
import { PrismaClient } from '@prisma/client';
import { fromJSON } from "postcss";

const prisma = new PrismaClient();

let userIdCached: string;

export const load = async ({ params }) => {
    let userId = params.slug;
    userIdCached = params.slug;
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });

    return {
        form: await superValidate(zod(userFormSchema)),
        user: user
    }
};

export const actions: Actions = {
    default: async (event) => {
        
        const form = await superValidate(event, zod(userFormSchema));
       
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
        
        await prisma.$transaction(async (txn) => {
            console.log(`Updating user: ${userIdCached}`);
            return await txn.user.update({
                where: {
                    id: userIdCached,
                },
                data: {
                    name: form.data.name
                }
            });
        });

        await prisma.$disconnect();
        
        return {
            edited: true
        }
    }
};
  