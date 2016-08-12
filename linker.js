const marked = require('marked');

const search_folders = [
  './lib',
  process.cwd()
];

function link(module_name, possible_folders) {
  try {
    return require(possible_folders.shift() + '/' + module_name);
  }catch(exception){
    if(possible_folders.length) {
      return link(module_name, possible_folders);
    }else{
      console.error("Linker couldn't find module " + module_name);
      process.exit(1);
    }
  }
}

module.exports = function(links) {
  links = [].concat(links || []);

  var renderer = new marked.Renderer();

  for(var i = 0; i < links.length; i++) {
    var func = link(links[i], search_folders);
    renderer = Object.assign(renderer, func(marked) || {});
  }

  return renderer;
}
