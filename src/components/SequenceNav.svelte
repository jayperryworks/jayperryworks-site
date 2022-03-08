<ol class="timeline">
	<slot></slot>
</ol>

<style>
	.timeline {
		display: flex;
		justify-content: space-between;
		list-style: none;
		margin: 0;
		padding: 0;
		position: relative;
	}

	.timeline::after {
		--border-w: 1px;

		border-top: var(--border-w) dashed var(--color-secondary);
		content: '';
		display: block;
		left: 0;
		position: absolute;
		right: 0;
		top: 50%;
		z-index: -1;
		margin-top: var(--border-w);
	}
</style>
