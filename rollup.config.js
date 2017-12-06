import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'index.js',
  output: {
    file: 'build/d3-selection.js',
    format: 'umd'
  },
  name: 'd3',
  plugins: [ resolve({
    // pass custom options to the resolve plugin
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  })],
  //external: ['d3-quadtree'],
  //globals: {
  //   'd3-quadtree': 'd3.quadtree',
//	}
};
