<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import Button from '$lib/components/ui/button/button.svelte';
	import Plus from 'lucide-svelte/icons/plus';

	let { data } = $props();

	function sanitizesWorkspaces(workspaces) {
		let workspaceNames: string[] = workspaces.map((workspace) => workspace.name);

		return workspaceNames.toString();
	}

	// NOTE: There is something very buggy about my implementation. Data does not get properly updated when a user navigates back to this page
	// or refreshes the page. I suspect it has something to do with me not making this component properly reactive, but I'm
	// moving on for now. Will fix if I have time. Seems like it would be an easy fix if I was more familiar with Svelte.
</script>

<div class="mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
	<div class="space-y-6 rounded-md border p-4">
		<div class="">
			<h2
				class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				Simple User Manager
			</h2>

			<Button href="/user">
				<Plus class="mr-2 h-4 w-4" />
				Add User
			</Button>

			<Button href="/workspace">
				<Plus class="mr-2 h-4 w-4" />
				Add Workspace
			</Button>
		</div>

		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">ID</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>Workspaces</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.users as user (user.id)}
					<Table.Row>
						<Table.Cell class="font-medium">{user.id}</Table.Cell>
						<Table.Cell>{user.name}</Table.Cell>
						<Table.Cell
							>{data.userWorkspaces[user.id] != null && data.userWorkspaces[user.id].length > 0
								? sanitizesWorkspaces(data.userWorkspaces[user.id])
								: 'None'}</Table.Cell
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
