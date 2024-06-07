import { prisma } from '$lib/server/db';
import { afterNavigate } from '$app/navigation';

export const load = async () => {
	console.log()
	const users = await prisma.user.findMany();

	let userWorkspaces: any = {};

	await users.forEach(async (user) => {
		let workspaces = await prisma.workspace.findMany({
			where: {
				users: {
					some: {
						user: {
							id: user.id
						}
					}
				}
			}
		});
		
		userWorkspaces[user.id] = workspaces;
		
	});

	return { users, userWorkspaces };
};