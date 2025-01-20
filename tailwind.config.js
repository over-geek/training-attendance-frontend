/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
			"./index.html",
			"./src/**/*.{ts,tsx,js,jsx}",
			"./node_modules/flowbite/**/*.js"
		],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require(
		"tailwindcss-animate",
		"flowbite/plugin"
	)],
}

