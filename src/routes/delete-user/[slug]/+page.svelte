<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
</script>

<div class="mx-auto mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
	<Button href="/">
		<ArrowLeft class="mr-2 h-4 w-4"></ArrowLeft>
		Back
	</Button>
	<p>User successfully deleted</p>
</div>
