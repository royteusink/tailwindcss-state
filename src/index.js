const plugin = require('tailwindcss/plugin');

module.exports = plugin(function(tailwind) {
  const { addVariant, theme, e } = tailwind;
  const statesConfig = theme('states');

  const variants = Object.entries(statesConfig).map(([variant, options]) => {
    if (options === true || typeof options === 'string') {
      return [variant.trim(), { element: true, children: true, group: false }];
    }
    return [variant.trim(), options];
  });

  const blackList = [
    'group-hover',
    'focus-within',
    'first',
    'last',
    'odd',
    'even',
    'hover',
    'focus',
    'active',
    'visited',
    'target',
    'disabled',
    'motion-safe',
    'motion-reduce',
  ];

  variants.forEach(([variant, options]) => {
    if (blackList.includes(variant)) {
      console.log(`"${variant}" cannot be used as a state. (tailwindcss-state)`);
      return;
    }

    if (options.group) {
      const prefix = typeof options.group === 'string' ? options.group : 'group';
      const groupVariant = `${prefix}-${variant}`;
      addVariant(groupVariant, ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.${variant} .${groupVariant}\\:${rule.selector.slice(1)}`;
        });
      });
    }

    if (options.element && !options.children) {
      addVariant(variant, ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.${variant}.${variant}\\:${rule.selector.slice(1)}`;
        });
      });
    } else if (options.element && options.children) {
      addVariant(variant, ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.${variant}.${variant}\\:${rule.selector.slice(1)}, .${variant} .${variant}\\:${rule.selector.slice(1)}`;
        });
      });
    } else if (!options.element && options.children) {
      addVariant(variant, ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.${variant} .${variant}\\:${rule.selector.slice(1)}`;
        });
      });
    }

  });
},
{
  theme: {
    states: {
      on: true,
    },
  },
});
