<script>
	onMount(() => {
		console.log('About page loaded');
	});
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import { onMount } from 'svelte';
</script>

<div
	class="text-darkprimary flex min-h-[246px] w-full items-center justify-center bg-white px-[80px] py-[67px] text-5xl"
>
	A brand built on the love of craftmanship,<br />
	quality and outstanding customer service
</div>

<!-- get in touch first -->
<div class="flex min-h-[603px]">
	<!-- left -->
	<div class="mt-[72px] flex w-1/2 flex-col justify-between pl-[80px] pr-[100px]">
		<div class="flex flex-col">
			<p class="text-darkprimary text-4xl">
				From a studio in London to a global brand with over 400 outlets
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
	<!-- right -->
	<div class="flex w-1/2 flex-col">
		<img
			src="/general/decorative-3.jpg"
			alt="decorative elements"
			class="h-full w-full object-cover"
		/>
	</div>
</div>

<!-- get in touch second -->
<div class="flex min-h-[603px]">
	<!-- left -->
	<div class="flex w-1/2 flex-col">
		<img
			src="/general/decorative-2.jpg"
			alt="decorative elements"
			class="h-full w-full object-cover"
		/>
	</div>
	<!-- right -->
	<div class="mt-[72px] flex w-1/2 flex-col justify-between pl-[100px] pr-[80px]">
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
