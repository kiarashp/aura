<script>
	onMount(() => {
		console.log('About page loaded');
	});
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import { onMount } from 'svelte';
</script>

<div
	class="flex min-h-[246px] w-full items-center justify-center bg-surface-300 dark:bg-primary-900 defaultPadding py-[67px] bigHeader"
>
	A brand built on the love of craftmanship,<br />
	quality and outstanding customer service
</div>

<!-- get in touch first -->
<div class="flex flex-col-reverse lg:flex-row lg:min-h-[603px]">
	<!-- left -->
	<div class="mt-[72px] flex w-full lg:w-1/2 flex-col justify-between  px-[25px] md:px-[80px]">
		<div class="flex flex-col lg:pr-[100px]">
			<p class="text-primary-950 dark:text-surface-600 bigHeader">
				From a studio in London to a global brand with over 400 outlets
			</p>
			<p class="mt-[35px] subheader text-surface-800 dark:text-tertiary-500">
				When we started Avion, the idea was simple. Make high quality furniture affordable and
				available for the mass market.
			</p>
			<p class="mt-[35px] subheader text-surface-800 dark:text-tertiary-500">
				Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so
				our Chelsea boutique become the hotbed for the London interior design community.
			</p>
		</div>
		<div class="my-[64px] w-[150px]">
			<SimpleButton btnText="Get in touch" btnWidth="w-full" />
		</div>
	</div>
	<!-- right -->
	<div class="flex w-full lg:w-1/2 flex-col">
		<img
			src="/general/decorative-3.jpg"
			alt="decorative elements"
			class="h-full w-full object-cover"
		/>
	</div>
</div>

<!-- get in touch second -->
<div class="flex flex-col lg:flex-row lg:min-h-[603px]">
	<!-- left -->
	<div class="flex w-full lg:w-1/2 flex-col">
		<img
			src="/general/decorative-2.jpg"
			alt="decorative elements"
			class="h-full w-full object-cover"
		/>
	</div>
	<!-- right -->
	<div class="mt-[72px] flex w-full lg:w-1/2 flex-col justify-between  px-[25px] md:px-[80px] ">
		<div class="flex flex-col">
			<p class="text-darkprimary text-4xl">
				Our service isn’t just personal, it’s actually hyper personally exquisite
			</p>

			<p class="mt-[35px] text-2xl text-[rgba(80,89,119,1)]">
				When we started Avion, the idea was simple. Make high quality furniture affordable and
				available for the mass market.
			</p>
			<p class="mt-[35px] text-2xl text-[rgba(80,89,119,1)]">
				Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so
				our Chelsea boutique become the hotbed for the London interior design community.
			</p>
		</div>
		<div class="my-[64px] w-[150px]">
			<SimpleButton btnText="Get in touch" btnWidth="w-full" />
		</div>
	</div>
</div>
