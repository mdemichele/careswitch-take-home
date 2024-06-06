import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
	const users = await prisma.$transaction(async (txn) => {
		await txn.user.deleteMany();
		return await txn.user.createManyAndReturn({
			data: [{ name: 'Alice' }, { name: 'Bob' }]
		});
	});

	const workspaces = await prisma.$transaction(async (txn) => {
		await txn.workspace.deleteMany();
		return await txn.workspace.createManyAndReturn({
			data: [{ name: 'front end team' }, { name: 'Back end team' }]
		})
	})

	console.log(`Created users: ${JSON.stringify(users)}`);
	console.log(`Created workspaces: ${JSON.stringify(workspaces)}`);
}

seed().finally(async () => {
	await prisma.$disconnect();
});
