<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { workspaceFormSchema, type WorkspaceFormSchema } from '../schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Control, FieldErrors } from 'formsnap';
	import { Field } from '$lib/components/ui/form';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { AnyDateTime } from '@internationalized/date';
	import type { User } from '@prisma/client';

	export let data: SuperValidated<Infer<WorkspaceFormSchema>>;

	export let users: User[];

	const form = superForm(data, {
		validators: zodClient(workspaceFormSchema)
	});

	const { form: formData, enhance } = form;

	$: selectedUsers = $formData.users.map((user) => ({ label: user, value: user }));
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>This is your public workspace name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Field {form} name="users">
		<Control let:attrs>
			<Label>Users</Label>
			<Select.Root
				multiple
				selected={selectedUsers}
				onSelectedChange={(s) => {
					console.log(s);
					if (s) {
						$formData.users = s.map((user) => user.value);
						console.log($formData.users);
					} else {
						$formData.users = [];
					}
				}}
			>
				{#each $formData.users as user}
					<input name={attrs.name} hidden value={user} />
				{/each}
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select users" />
				</Select.Trigger>
				<Select.Content>
					{#each users as user}
						<Select.Item value={user.id} label={user.name} />
					{/each}
				</Select.Content>
			</Select.Root>
			<FieldErrors />
		</Control>
	</Field>
	<Form.Button>Submit</Form.Button>
</form>
