<script>
	export let error;
	export let status;
</script>

<div
	class=" text-darkprimary flex flex-col items-center justify-center bg-white px-[80px] text-center"
>
	<div class="w-1/3 pb-14">
		<h1 class="mt-[40px] text-3xl font-bold">Oops! Page not found</h1>
		<p class="mt-[40px] text-xl">
			We couldn’t find the page you’re looking for. It might have been removed, renamed, or did not
			exist in the first place.
		</p>

		<a
			href="/"
			class="bg-primary hover:bg-darkprimary mt-4 inline-block rounded-lg px-6 py-3 text-white shadow transition"
		>
			Back to Home
		</a>

		<div class="mt-12 flex items-center justify-center">
			<div class="flex items-center justify-center max-w-[300px]">
				<img
					src="/general/simple-chair-1.png"
					alt="Stylish Chair"
					class=" mx-auto drop-shadow-lg"
				/>
			</div>
		</div>

		{#if error?.stack}
			<p class="mt-8 text-sm text-[rgba(202,198,218,1)]">
				Error {status}: {error?.message || 'Something went wrong'}
			</p>
		{/if}
	</div>
</div>
