<script>
	let {
		inputBG = 'bg-[rgba(255,255,255,0.15)]',
		inputTxtCol = 'text-white',
		inputName = 'newsLetterField',
		btnBG = 'bg-white',
		hoverBtnBG = 'hover:bg-bordergrey',
		btnTxtCol = 'text-[rgba(42, 37, 75, 1)]',
		btnTxtSize = 'text-2xl'
	} = $props();
</script>

<div class="flex">
	<div class="w-7/10 h-[56px]">
		<input
			placeholder="your@email.com"
			name={inputName}
			type="text"
			class="h-full w-full px-[32px] py-[17px] text-sm {inputTxtCol} {inputBG} "
		/>
	</div>
	<button
		class="{hoverBtnBG} w-3/10 flex h-[56px] cursor-pointer items-center justify-center {btnBG} duration-200"
	>
		<span class="{btnTxtCol} {btnTxtSize}">Sign up</span>
	</button>
</div>
