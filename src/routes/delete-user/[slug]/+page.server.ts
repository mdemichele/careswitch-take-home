import { PrismaClient } from '@prisma/client';
import { URL } from 'svelte/reactivity';

const prisma = new PrismaClient();

export const load = async ({ params }) => {
    let userId = params.slug;
   
    const deleteUser = await prisma.user.delete({
        where: {
            id: userId
        }
    });

    await prisma.$disconnect();
};