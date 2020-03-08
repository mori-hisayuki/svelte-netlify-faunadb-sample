<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	type Task = {
		id: number
		done: boolean
		description: string
	}

	const [send, receive] = crossfade({
		fallback(node :Element, params: any) {
			const style: CSSStyleDeclaration = getComputedStyle(node);
			const transform: String = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	let todos: Array<Task> = [
		{ id: 1, done: false, description: 'write some docs' },
		{ id: 2, done: false, description: 'start writing JSConf talk' },
		{ id: 3, done: true, description: 'buy some milk' },
		{ id: 4, done: false, description: 'mow the lawn' },
		{ id: 5, done: false, description: 'feed the turtle' },
		{ id: 6, done: false, description: 'fix some bugs' },
	];

	let uid: number = todos.length + 1;

	function addTask(inputElement: any) {
		const todo: Task = {
			id: uid++,
			done: false,
			description: inputElement.value
		}
		todos = [todo, ...todos];
	}

	function removeTask(todo) {
		todos = todos.filter(t => t !== todo);
	}

</script>
<template lang="pug">
- var cssName = "./App.scss"
	style(src=cssName)
main
	div.board
		input(class="new-todo",placeholder="what needs to be done?", on:keydown!="{event => event.which === 13 && addTask(event.target)}")
		div.left
			h2 todo
			+each('todos.filter(task => !task.done) as todo')
				label(in:receive="{{key: todo.id}}", out:send="{{key: todo.id}}")
					input(type="checkbox",bind:checked!="{todo.done}")
					| {todo.description}
					button(on:click!="{() => removeTask(todo)}") x
		div.right
			h2 done
			+each('todos.filter(task => task.done) as todo')
				label(in:receive="{{key: todo.id}}", out:send="{{key: todo.id}}")
					input(type="checkbox",bind:checked!="{todo.done}")
					| {todo.description}
					button(on:click!="{() => removeTask(todo)}") x
</template>
