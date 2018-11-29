# Direction finder

> A Vue.js project

## Remarks

The solution that I provided is about building a simple UI after doing some UX research. Then, take the response.json and build up a graph using it that I can pass to my pathfinder algorithm (Dijkstra). This part is an implementation detail that I abstracted behind two "API" calls.

### JS Framework

I used **Vue.js** because my latest project is written in this. I've already used all of the biggest frameworks like Vue.js, Angular.js, React.js so as you can see I dropped the DSL of Vue.js and used it in **language agnostic** way. The store is not utilized because of the simplicity of the project.

### Pathfinding

I created a small implementation of the Dijkstra algorithm according to an article on the internet to find the optimal path.

### FP

I used lodash/FP instead of ramda because I did a benchmark before adding it. It showed Lodash FP is almost alwys faster then ramda.js. see: _Run benchmarks_. Some of the principles of FP was unfortunately ignored because of the time and effort but I'd be happy to discuss it later. I like this topic besides OOP, Actor model etc. :)

### UX/UI

I did a resource on the internet regarding the UX. I placed the images to docs/UX directory. To implement the UI and demonstrate a component library I chose bootstrap with Vue.js because everybody knows it.

## Improvements

- Should add autocomplete to the text field to find the cities easier. (Feedback message is added if there is no result.)

## Build Setup

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn build --report
```

## Run tests

```bash
# run tests
yarn test

# if you have global jest installed then you can run the following command
```

## Run benchmarks

In the benchmark folder, you can find some tests regarding the testing of ramda and lodash/fp. To run the benchmark you need to install the dependencies as you did for the main project then run.

> You can also just open the result.txt because I exported the result of it.

```bash
# run tests
cd ./benchmark
yarn install
yarn test

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
