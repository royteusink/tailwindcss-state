# tailwindcss-state

TailwindCSS plugin for managing state classes (JIT only).

Solves the problem to apply styles when a specific custom class is applied.

```html
<div class="on on:bg-green-100"> <!-- toggle "on" class through javascript -->
    <div class="on:bg-red-500">example</div>
</div>
```

**NOTE:** It is not possible to use the `.active` class, since TailwindCSS uses active for `:active` selectors.

**Example state scopes:**

- on (default)
- activated
- expanded
- opened
- on-expand
- on-open

## Install

```shell
npm install tailwindcss-state
yarn add tailwindcss-state
```

## Configuration

tailwind.config.js
```js
{
    theme: {
        extend: {
            // states: {}
        },
        states: {
            on: true,           // default: { element: true, children: true, group: false }
            activated: {
                element: true,  // boolean
                children: true, // boolean
                group: 'group', // prefix | boolean
            },
            expanded: true,
        },
    }

    plugins: [
        require('tailwindcss-state'),
    ],
}
```

## Usage

### Element example:

Activator works on the same element.

```html
<button class="border-2 border-transparent on:border-green-500 on">Menu item</button>
```

### Children example:

Activator works for child elements.

```html
<div class="bg-red-200 on:bg-green-200 on">
    <button type="button" class="bg-red-500 on:bg-green-500">Make group active</button>
</div>
```

### Group example:

Activator works with `group-` prefix.

```html
<div class="bg-red-200 activated:bg-green-200 activated">
    <button type="button" class="bg-red-500 group-activated:bg-green-500">Make group active</button>
</div>
```

### Scopes (Nested toggle states):

This example shows two nested states (`activated` and `expanded`), the state names must be different else they will interfere each other.

```html
<aside class="invisible activated:visible activated">
    Sidebar
    <div class="expanded">
        <button class="expanded:font-bold">
            FAQ Question
        </button>
        <div class="opacity-0 max-h-0 overflow-hidden transition-all expanded:max-h-[40rem] expanded:opacity-100">
            FAQ answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempus, velit at mattis hendrerit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempus, velit at mattis hendrerit.
        </div>
    </div>
</aside>
<button>Toggle .activated of sidebar</button>
```

### Combine with :hover, :focus

```html
<div class="bg-red-100 border-4 activated:bg-green-200 activated:hover:bg-blue-500 activated:border-green-400">
    <button type="button" class="bg-red-500 group-activated:hover:bg-blue-600">Activate</button>
</div>
```

## Demo

TODO: codesandbox examples.
