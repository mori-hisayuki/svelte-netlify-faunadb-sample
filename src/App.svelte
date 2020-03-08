<script lang="ts">
  const svelte: string = "Svelte";
  const b: string = "Typescript";
	const c: string = "Rollup";
</script>
<template lang="pug">
- var cssName = "./App.scss"
	style(src=cssName)
	main
		h1.test Hello {svelte} + {b} +{c}!
		p Visit the to learn how
			|
			|
			a(href="https://svelte.dev/tutorial") Svelte tutorial
			|
			| to build Svelte apps.
</template>
