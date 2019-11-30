## Xhr Lib

### Top-Level Usage

If you'd like to run the Xhr example from the top-level of EDS:

```shell
yarn xhr # in one tab will build the Typescript and start the API server
yarn styleguide # in another tab to run EDS (as usual)
```

### Usage

If you'd like to build things within this directory:


In `src/xhr/package.json` you'll find in `scripts`:

- `yarn generate:posts` -- generates postsdb.json
- `yarn api:posts` -- runs json-server using the generated posts

The above commands generate and serve up the API. Thus, in another tab do something like:

- `yarn build` -- to generate the Xhr lib
- Then from the top-level of the EDS you should be able to start the styleguide with `yarn styleguide`
