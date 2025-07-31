<script lang="ts">
import SimpleButton from "./SimpleButton.svelte";
</script>
<!-- get in touch -->
<div class="flex min-h-[603px] pl-[80px]">
	<!-- left -->
	<div class="mt-[72px] flex w-1/2 flex-col justify-between pr-[100px]">
		<div class="flex flex-col">
			<p class="text-primary-950 dark:text-surface-600 text-4xl">
				From a studio in London to a global brand with over 400 outlets
			</p>
			<p class="mt-[35px] text-2xl text-surface-800 dark:text-tertiary-500">
				When we started Avion, the idea was simple. Make high quality furniture affordable and
				available for the mass market.
			</p>
			<p class="mt-[35px] text-2xl text-surface-800 dark:text-tertiary-500">
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
			src="/products/Countryside-Dresser-with-6-Drawers.jpg"
			alt="decorative elements"
			class="h-full w-full object-cover"
		/>
	</div>
</div>