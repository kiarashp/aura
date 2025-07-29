<script>
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import NewsLetter from '$lib/components/NewsLetter.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	const { data } = $props();
	const products = data.products;
</script>

<!-- two color slide -->
<div class=" grid min-h-[705px] grid-cols-12 bg-white px-[80px] py-[60px]">
	<!-- left side -->
	<div
		class="bg-darkprimary col-span-7 flex flex-col justify-between py-[60px] pl-[60px] pr-[98px]"
	>
		<!--top left text box-->
		<div class="flex flex-col gap-[41px] pr-[89px]">
			<p class="text-4xl text-white">The furniture brand for the future, with timeless designs</p>
			<button
				class="h-[56px] w-[170px] cursor-pointer bg-[rgba(249,249,249,0.15)] text-white duration-200 hover:bg-[rgba(249,249,249,0.20)]"
				>View collection</button
			>
		</div>
		<!-- bottom left text box -->
		<p class="text-lg text-white">
			A new era in eco friendly furniture with Avelon, the French luxury retail brand with nice
			fonts, tasteful colors and a beautiful way to display things digitally using modern web
			technologies.
		</p>
	</div>
	<!-- right side -->
	<div class="col-span-5 flex items-end justify-center bg-[#83A9AC]">
		<div class="w-[70%]">
			<img src="/general/simple-chair-5.png" alt="" />
		</div>
	</div>
</div>

<!-- what makes us different -->
<div class="text-darkprimary flex min-h-[355px] flex-col px-[80px] pt-[60px]">
	<!--title-->
	<p class="w-full text-center text-2xl">What makes our brand different</p>
	<div class="mt-[51px] flex gap-[20px]">
		<!-- col 1 -->
		<div class="flex grow basis-[305px] flex-col">
			<!-- icon -->
			<div class="h-[24px] w-[24px]">
				<img src="/icons/delivery.svg" alt="delivery icon" />
			</div>
			<!-- mini title -->
			<p class="mt-[16px] text-2xl">Next day as standard</p>
			<p class="mt-[8px] text-base">Order before 3pm and get your order the next day as standard</p>
		</div>
		<!-- col 2 -->
		<div class="flex grow basis-[305px] flex-col">
			<!-- icon -->
			<div class="h-[24px] w-[24px]">
				<img src="/icons/checkmark.svg" alt="delivery icon" />
			</div>
			<!-- mini title -->
			<p class="mt-[16px] text-2xl">Made by true artisans</p>
			<p class="mt-[8px] text-base">
				Handmade crafted goods made with real passion and craftmanship
			</p>
		</div>
		<!-- col 3 -->
		<div class="flex grow basis-[305px] flex-col">
			<!-- icon -->
			<div class="h-[24px] w-[24px]">
				<img src="/icons/purchase.svg" alt="delivery icon" />
			</div>
			<!-- mini title -->
			<p class="mt-[16px] text-2xl">Unbeatable prices</p>
			<p class="mt-[8px] text-base">
				For our materials and quality you won’t find better prices anywhere
			</p>
		</div>
		<!-- col 4 -->
		<div class="flex grow basis-[305px] flex-col">
			<!-- icon -->
			<div class="h-[24px] w-[24px]">
				<img src="/icons/sprout.svg" alt="delivery icon" />
			</div>
			<!-- mini title -->
			<p class="mt-[16px] text-2xl">Recycled packaging</p>
			<p class="mt-[8px] text-base">
				We use 100% recycled packaging to ensure our footprint is manageable
			</p>
		</div>
	</div>
</div>

<!-- New products -->
<div class="text-darkprimary flex min-h-[761px] flex-col px-[80px] pt-[80px]">
	<!-- title -->
	<p class="text-2xl">New products</p>

	<!-- group -->
	<div class="flex flex-wrap gap-[20px]">
		{#if products && products.length > 0}
			{#each products.slice(0, 4) as product (product.id)}
				<ProductCard {product} class="grow basis-[305px] flex-col max-w-[395px]" />
			{/each}
		{:else}
			<p class="w-full py-10 text-center text-gray-500">No products found.</p>
		{/if}
	</div>
	<div class="mt-[35px] flex items-center justify-center">
		<SimpleButton btnText="View all" />
	</div>
</div>

<!-- populer products -->
<div class="text-darkprimary flex min-h-[744px] flex-col px-[80px] py-[64px]">
	<p class="text-2xl">Our popular products</p>
	<div class="flex gap-[20px]">
		<!-- left -->
		<div class="flex w-1/2 flex-col">
			<div class="mt-[33px] aspect-[630/375] overflow-hidden">
				<img class="h-full w-full object-cover" src="/products/Harmony-Fabric-Sofa.jpg" alt="" />
			</div>
			<p class="mt-[24px] text-base">The Dandy chair</p>
			<p class="mt-[8px] text-sm">€250</p>
		</div>
		<!-- right -->
		<div class="flex w-1/2 gap-[20px]">
			<!-- card 1 -->
			<div class="flex grow basis-[610px] flex-col">
				<div class="mt-[33px] aspect-[305/375] overflow-hidden">
					<img
						class="h-full w-full object-cover"
						src="/products/Compact-Entryway-Shoe-Cabinet.jpg"
						alt=""
					/>
				</div>
				<p class="mt-[24px] text-base">The Dandy chair</p>
				<p class="mt-[8px] text-sm">€250</p>
			</div>
			<!-- card 2 -->
			<div class="flex grow basis-[610px] flex-col">
				<div class="mt-[33px] aspect-[305/375] overflow-hidden">
					<img
						class="h-full w-full object-cover"
						src="/products/Cloud-Nine-Platform Bed-Frame.jpg"
						alt=""
					/>
				</div>
				<p class="mt-[24px] text-base">The Dandy chair</p>
				<p class="mt-[8px] text-sm">€250</p>
			</div>
		</div>
	</div>
	<div class="mt-[35px] flex items-center justify-center">
		<SimpleButton btnText="View all" />
	</div>
</div>

<!--join the club -->
<div class="bg-lightgrey flex min-h-[481px] items-center justify-center px-[80px] py-[50px]">
	<div class="flex min-h-[364px] w-full flex-col items-center bg-white">
		<p class="text-darkprimary pt-[68px] text-2xl">Join the club and get the benefits</p>
		<p class="text-darkprimary pt-[16px] text-center text-lg">
			Sign up for our newsletter and receive exclusive offers on new <br /> ranges, sales, pop up stores
			and more
		</p>
		<!-- sign up form -->
		<div class=" mt-[72px] min-w-[354px]">
			<div class="h-[56px] w-full"><NewsLetter version={2} /></div>
		</div>
	</div>
</div>

<!-- get in touch -->
<div class="flex min-h-[603px] pl-[80px]">
	<!-- left -->
	<div class="mt-[72px] flex w-1/2 flex-col justify-between pr-[100px]">
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
			src="/products/Countryside-Dresser-with-6-Drawers.jpg"
			alt="decorative elements"
			class="h-full w-full object-cover"
		/>
	</div>
</div>
