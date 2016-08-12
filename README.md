# mdc - Markdown Compiler

This is a simple CLI for a markdown compiler that I've cobbled together.
In fact it's so simple that all the heavy lifting is done by
[marked](https://github.com/chjj/marked).

> Note that marked also has a simple CLI.

## Install

Clone the repo and then

```bash
npm install -g
```

## Simple Usage

```bash
mdc infile -o outfile
```

It will also handle piping, eg:

```bash
echo "Hello World" | mdc -o outfile
```

OR

```bash
mdc infile > outfile
```

If you supply more than one input file they'll be concatenated in the
output. Order matters.
