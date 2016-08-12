#!/usr/bin/env node
//===========================================================================
//  CMD Markdown Compiler
//  Usage:
//    mdc [-l module] [infile] [-o outfile]
//===========================================================================

const linker = require('./linker');

const fs = require('fs');
const marked = require('marked');
const minimist = require('minimist');

var vargs = minimist(process.argv.slice(2));

var renderer = linker(vargs.l);

function readStream(stream, done) {
  var data = '';

  stream.resume();
  stream.setEncoding('utf8');

  stream.on('data', function(chunk) {
    data += chunk;
  });

  stream.on('end', function(chunk) {
    done(data);
  });
}

function getmarkdown(done) {
  var streams = [];

  for(var i = 0; i < vargs._.length; i++) {
    streams.push(fs.createReadStream(vargs._[i]));
  }

  if(streams.length == 0) {
    streams.push(process.stdin);
  }

  var all_data = '';

  function callback(data) {
    all_data += data;
    if(streams.length) {
      readStream(streams.shift(), callback);
    }else{
      done(all_data);
    }
  }

  readStream(streams.shift(), callback);
}

var outstream = (vargs.o) ? fs.createWriteStream(vargs.o) : process.stdout;

getmarkdown(function(md) {
  outstream.write(marked(md, { renderer: renderer }));
});
