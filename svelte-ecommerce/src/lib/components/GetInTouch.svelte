<script lang="ts">
import SimpleButton from "./SimpleButton.svelte";
</script>
<!-- get in touch -->
<div class="flex flex-col-reverse lg:flex-row lg:min-h-[603px] lg:pl-[80px]">
	<!-- left -->
	<div class="mt-[72px] flex w-full lg:w-1/2 flex-col justify-between  px-[25px] md:px-[80px] lg:px-0 ">
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
		<div class="my-[64px] w-[150px] ">
			<SimpleButton btnText="Get in touch" btnWidth="w-full" />
		</div>
	</div>
	<!-- right -->
	<div class="flex w-full lg:w-1/2 flex-col">
		<img
			src="/products/Countryside-Dresser-with-6-Drawers.jpg"
			alt="decorative elements"
			class="h-full w-full object-cover"
		/>
	</div>
</div>