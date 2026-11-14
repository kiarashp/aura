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
			<h1 class="text-surface-100 text-xl lg:text-4xl">Quiet furniture for everyday rooms</h1>

			<SimpleButton
				variant="primary"
				btnText="View collection"
				onclick={() => {
					goto('/categories');
				}}
			/>
		</div>
		<!-- bottom left text box -->
		<p class="text-surface-100 mt-8 text-base lg:mt-0 lg:text-lg">
			Aura is a small collection of sofas, tables, storage and beds, chosen for soft colours and
			simple shapes. Browse the rooms, fill a cart and check out with a test card. It's a demo, so
			nothing is charged.
		</p>
	</div>
	<!-- right side -->
	<div class="col-span-12 flex items-end justify-center bg-[#83A9AC] lg:col-span-5">
		<div class="w-[70%] py-5 lg:p-0">
			<img src="/general/simple-chair-5.webp" alt="" width="1000" height="1000" fetchpriority="high" />
		</div>
	</div>
</div>
