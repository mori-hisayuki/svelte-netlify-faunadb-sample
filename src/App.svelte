<script lang="ts">
  const a: string = "Svelte",
    b: string = "Typescript",
	c: string = "Rollup";
</script>
<template lang="pug">
	main
		h1.test Hello {a} + {b} +{c}!
		p Visit the to learn how
			|
			|
			a(href="https://svelte.dev/tutorial") Svelte tutorial
			|
			| to build Svelte apps.
</template>

<style lang="css">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
