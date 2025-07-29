<script>
	let { customClass = 'grow basis-[305px] flex-col max-w-[395px]', product  } = $props();
	let productUrl = '/products/' + product.id;

</script>

<a  href={productUrl} class="{customClass} group/proCard flex flex-col hover:cursor-pointer">
	<div class="mt-[33px] aspect-[1/1] overflow-hidden">
		<img
			class="duration-2000 group-hover/proCard:scale-135 h-full w-full object-contain"
			src={product.imageUrl}
			alt=""
		/>
	</div>
	<p class="mt-[24px] text-base">{product.name}</p>
	<p class="mt-[8px] text-sm">{product.price}</p>
</a>
