<script lang="ts">
	import NewsLetter from '$lib/components/NewsLetter.svelte';
</script>

<!--join the club -->
<div
	class="text-surface-950 dark:text-surface-200 bg-surface-500 dark:bg-primary-800 flex min-h-[481px] items-center justify-center defaultPadding py-[50px]"
>
	<div class="bg-surface-50 dark:bg-primary-900 flex min-h-[364px] w-full flex-col
	 lg:items-center justify-center lg:justify-start p-[10%]">
		<p class="text-primary-950 dark:text-surface-100 pt-0 lg:pt-[68px] header">
			Join the club and get the benefits
		</p>
		<p class="text-primary-950 dark:text-surface-100 pt-3 lg:pt-[16px] md:text-center smalltext ">
			Sign up for our newsletter and receive exclusive offers on new <br /> ranges, sales, pop up stores
			and more
		</p>
		<!-- sign up form -->
		<div class="mt-5  lg:mt-[72px] lg:min-w-[354px]">
			<div class=" md:h-[56px] w-full"><NewsLetter version={2} /></div>
		</div>
	</div>
</div>
