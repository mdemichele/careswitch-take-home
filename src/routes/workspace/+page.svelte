<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
	import WorkspaceForm from './workspace-form.svelte';

	let { data } = $props();
</script>

<div class="mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
	<!-- header nav -->
	<div class="">
		<Button href="/">
			<ArrowLeft class="mr-2 h-4 w-4"></ArrowLeft>
			Back
		</Button>
	</div>

	<!-- Title section -->
	<div class="mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
		<h2 class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">Add Workspace</h2>
	</div>

	<!-- Form section -->
	<div class="space-y-6 rounded-md border p-4">
		<WorkspaceForm users={data.users} data={data.form} />
	</div>
</div>
