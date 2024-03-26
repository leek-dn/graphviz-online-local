#  graphviz-online-local

 Web implementation of graphviz, with persistant panning, dreampuf compatibility (almost), possible to fully run locally

 This variant requires a bash shell to build. I try multiple things over this. I try to reach 100% compatibility with [Dreampuff's Graphviz online](https://dreampuf.github.io/GraphvizOnline/) but then improving what can be better.

You might need to do `export NODE_PATH="$PWD/node_modules:$NODE_PATH"` in your terminal before building. Only build/predeploy is something that is tested.
You need the files `render.browser.js` and `render.wasm` from [AduH95's repo](https://github.com/aduh95/viz.js/) and put both in `src`. I do get that this is inconvient.
The script patchtolocalworking.sh makes the wasm code and the worker be integrated in the `bundle.js` file. Possibly in the future this will integrate also the `css` and `js` file(s) into the `html`. The files starting with numbers are hardest to integrate.

The node version this works on is v19 currently.