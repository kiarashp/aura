<script>
	import { goto } from '$app/navigation';
	onMount(() => {
		console.log('About page loaded');
	});
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import { onMount } from 'svelte';
</script>

<div
	class="bg-surface-300 dark:bg-primary-900 defaultPadding bigHeader flex min-h-[246px] w-full items-center justify-center py-[67px]"
>
	Crafted with Love, Built on Quality
</div>

<!-- get in touch first -->
<div class="flex flex-col-reverse lg:min-h-[603px] lg:flex-row">
	<!-- left -->
	<div class="mt-[72px] flex w-full flex-col justify-between px-[25px] md:px-[80px] lg:w-1/2">
		<div class="flex flex-col lg:pr-[100px]">
			<p class="text-primary-950 dark:text-surface-600 bigHeader">
				Our Story
			</p>
			<p class="subheader text-surface-800 dark:text-tertiary-500 mt-[35px]">
				Our journey began in a small studio in Copenhagen with a simple idea: to make high-quality, handcrafted furniture accessible to everyone. 
			</p>
			<p class="subheader text-surface-800 dark:text-tertiary-500 mt-[35px]">
				Our passion for design and craftsmanship quickly made our local boutique a favorite among the design community, and we've since grown into a global brand with over 400 outlets.
			</p>
		</div>
		<div class="my-[64px] w-[150px]">
			<SimpleButton
				btnText="Learn More"
				btnWidth="w-full"
				onclick={() => {
					goto('/about');
				}}
			/>
		</div>
	</div>
	<!-- right -->
	<div class="flex w-full flex-col lg:w-1/2">
		<img
			src="/general/decorative-3.jpg"
			alt="decorative elements"
			class="h-full w-full object-cover"
		/>
	</div>
</div>

<!-- get in touch second -->
<div class="flex flex-col lg:min-h-[603px] lg:flex-row">
	<!-- left -->
	<div class="flex w-full flex-col lg:w-1/2">
		<img
			src="/general/decorative-2.jpg"
			alt="decorative elements"
			class="h-full w-full object-cover"
		/>
	</div>
	<!-- right -->
	<div class="mt-[72px] flex w-full flex-col justify-between px-[25px] md:px-[80px] lg:w-1/2">
		<div class="flex flex-col">
			<p class="text-primary-950 dark:text-surface-600 bigHeader">
				The Aura Journey
			</p>

			<p class="subheader text-surface-800 dark:text-tertiary-500 mt-[35px]">
				Our story began in a small studio in Copenhagen with a simple mission: to make high-quality, handcrafted furniture accessible to all.
			</p>
			<p class="subheader text-surface-800 dark:text-tertiary-500 mt-[35px]">
				Our passion for design and craftsmanship quickly made our local boutique a favorite among the design community, and we've since grown into a global brand with over 400 outlets.
			</p>
		</div>
		<div class="my-[64px] w-[150px]">
			<SimpleButton
				btnText="Learn More"
				btnWidth="w-full"
				onclick={() => {
					goto('/about');
				}}
			/>
		</div>
	</div>
</div>
