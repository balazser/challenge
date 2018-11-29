# Direction finder

> A Vue.js project

## Remarks

### JS Framework

I used Vue.js because my latest project is written in this. I've already used all of the biggest frameworks like Vue.js Angular.js React.js so as you can see I dropped the DSL of Vue.js and used it in language agnostic way. The store is not utilized because of the simplicity of the project.

### Pathfinding

I created a small implementation of the Dijkstra algorithm according to an article on the internet to find the optimal path.

### FP

I used lodash/FP instead of ramda because I did a benchmark before and It showed Lodash FP is almost faster then ramda.js. I used benchmark.js for this. Some of the principles of FP is was unfortunately ignored because of the time and effort but on an interview we can discuss it besides OOP, Actor model etc. I like this topic. :)

### UX/UI

I did a minimal resource on the internet regarding the UX. I placed the images to docs/UX directory. To implement the UI and demonstrate a comp library I used bootstrap with Vue.js because it is out of the box with many utility classes.

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

In the benchmark folder, you can find some files regarding the testing of ramda and lodash/fp. To run the benchmark you need to install the dependencies as you did for the main project then run.

> You can also just open the result.txt because I exported the result of it.

```bash
# run tests
cd ./benchmark
yarn install
yarn test

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
