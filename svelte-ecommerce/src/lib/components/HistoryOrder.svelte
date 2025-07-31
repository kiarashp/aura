<script lang="ts">
	const tableData = [
		{ position: '0', orderNumber: '10032', orderDate: '20/2/2025', orderStatus: 'delivered' },
		{ position: '1', orderNumber: '10033', orderDate: '22/3/2025', orderStatus: 'delivered' },
		{ position: '2', orderNumber: '10034', orderDate: '26/4/2025', orderStatus: 'shipped' },
		{ position: '3', orderNumber: '10035', orderDate: '28/6/2025', orderStatus: 'processing' },
		{ position: '4', orderNumber: '10036', orderDate: '31/7/2025', orderStatus: 'processing' }
	];
</script>

<div class="flex w-full flex-col md:w-3/4">
	<h1 class="text-primary-900 dark:text-primary-50 mb-4 text-2xl font-semibold">Track Orders</h1>
	<div class="table-wrap">
		<table class="table caption-bottom">
			<caption class="pt-4">List of orders with number, date and status.</caption>
			<thead>
				<tr class="text-primary-950 dark:text-primary-200 font-bold ">
					<th>Position</th>
					<th>Symbol</th>
					<th>Order Date</th>
					<th class="!text-right">Order Status</th>
				</tr>
			</thead>
			<tbody class="[&>tr]:hover:preset-tonal-primary">
				{#each tableData as row}
					<tr class="">
						<td>{row.position}</td>
						<td>{row.orderNumber}</td>
						<td>{row.orderDate}</td>
						<td class="text-right">{row.orderStatus}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<td colspan="3">Total</td>
					<td class="text-right">{tableData.length} Elements</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
