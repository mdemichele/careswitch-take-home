<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { User } from '@prisma/client';
	import { userFormSchema, type UserFormSchema } from '../../schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<UserFormSchema>>;

	export let user: User;
	export let edited = false;

	const form = superForm(data, {
		validators: zodClient(userFormSchema)
	});

	const { form: formData, enhance } = form;
	$formData.name = user.name;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>

{#if edited}
	<p>User Successfully Edited</p>
{/if}
