<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Textfield from '@smui/textfield';
	import Card, {PrimaryAction} from '@smui/card';
	import Button, {Label} from '@smui/button';

	type Task = {
		id: number;
		done: boolean;
		description: string;
	}


	const [send, receive] = crossfade({
		fallback(node, params) {
			console.log(node);
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
	let taskText: string = '';

	function addTask() {
		const todo: Task = {
			id: uid++,
			done: false,
			description: taskText
		}
		todos = [todo, ...todos];
		taskText = '';
	}

	function doneTask(todo: Task) {
		todo.done = !todo.done;
		console.log(todo);
	}

	function removeTask(todo: Task) {
		todos = todos.filter(t => t !== todo);
	}

</script>
<style src="./App.sass"></style>
<main>
    <div class="board">
    <Textfield variant="outlined" bind:value="{taskText}" label="what needs to be done?" on:keydown="{event => event.which === 13 && addTask()}" style="width: 100%;"/>
    <div class="task left">
        <h2>todo</h2>
        {#each todos.filter(task => !task.done) as todo (todo.id)}
            <label in:receive="{{key: todo.id}}" out:send="{{key: todo.id}}" animate:flip>
                <input type="checkbox" bind:checked="{todo.done}">
                {todo.description}
                <button on:click="{() => removeTask(todo)}">x</button>
            </label>
        {/each}
    </div>
    <div class="task right">
        <h2>done</h2>
        {#each todos.filter(task => task.done) as todo (todo.id)}
            <label in:receive="{{key: todo.id}}" out:send="{{key: todo.id}}" animate:flip>
                <input type="checkbox" bind:checked="{todo.done}">
                {todo.description}
                <button on:click="{() => removeTask(todo)}">x</button>
            </label>
        {/each}
    </div>
</div>
</main>
