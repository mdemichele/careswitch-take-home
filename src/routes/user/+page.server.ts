import type { PageServerLoad } from "../$types";
import { fail, superValidate } from "sveltekit-superforms";
import { userFormSchema, type UserFormSchema } from "../schema";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions } from "@sveltejs/kit";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(userFormSchema)),
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
            return await txn.user.create({
                data: form.data
            });
        });

        await prisma.$disconnect();
    },
  };
  