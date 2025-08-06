<script lang="ts">
	import { goto } from '$app/navigation';
	import SimpleButton from './SimpleButton.svelte';
</script>

<!-- two color slide -->
<div
	class=" bg-surface-50 dark:bg-primary-900 defaultPadding grid min-h-[705px] grid-cols-12 py-[60px]"
>
	<!-- left side -->
	<div
		class="bg-primary-950 col-span-12 flex flex-col justify-between px-9 py-14 lg:col-span-7 lg:py-[60px] lg:pl-[60px] lg:pr-[98px]"
	>
		<!--top left text box-->
		<div class="flex flex-col gap-[41px] lg:pr-[89px]">
			<p class="text-surface-100 text-xl lg:text-4xl">
				The furniture brand for the future, with timeless designs
			</p>

			<SimpleButton
				variant="primary"
				btnText="View collection"
				onclick={() => {
					goto('/products');
				}}
			/>
		</div>
		<!-- bottom left text box -->
		<p class="text-surface-100 mt-8 text-base lg:mt-0 lg:text-lg">
			A new era in eco friendly furniture with Avelon, the French luxury retail brand with nice
			fonts, tasteful colors and a beautiful way to display things digitally using modern web
			technologies.
		</p>
	</div>
	<!-- right side -->
	<div class="col-span-12 flex items-end justify-center bg-[#83A9AC] lg:col-span-5">
		<div class="w-[70%] py-5 lg:p-0">
			<img src="/general/simple-chair-5.png" alt="" />
		</div>
	</div>
</div>
