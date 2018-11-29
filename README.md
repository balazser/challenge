# Direction finder

> A Vue.js project

## Remarks

### JS Framework

I used Vue.js because my latest project is written in this. I've already used all of the biggest frameworks like Vue.js Angular.js React.js so as you can see I dropped the DSL of Vue.js and used it in language agnostic way. The store is not utilized because of the simplicity of the project.

### Path finding

I created a small implementation of the dijkstra algorithm according to an article on the internet to find the optimal path.

### FP

I used lodash/fp instead of ramda because I did a benchmark before and It showed Lodash FP is almost more faster then ramda.js. I used benchmark.js for this.

### UX/UI

I did a minimal resource on the internet regarding the UX. I placed the images to docs/ux directory. To implement the UI and demonstrate an comp library I used bootstrap with Vue.js because it is out of box with many of utility classes.

## Improvements

- Should add autocomplete to the text field to find the cities easier. (Feedback message is added if there is result.)

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

# if you have global jest installed then you can run the follooing command
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
