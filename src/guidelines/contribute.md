Thank you for contributing to the EDS a.k.a. the Ethos Design System. Here you will find guidelines on:

- General local development process
- Developing locally while consuming from CMS, Monorepo, Nora, etc.
- How to submit your contribution

## General local development process

Getting setup locally is described in [setup](https://github.com/getethos/ethos-design-system#setup) and [development](https://github.com/getethos/ethos-design-system#development)

## Developing locally while consuming from CMS, Monorepo, Nora, etc.

A common use case is you're working in CMS, monorepo, Nora, etc., and you discover a bug or missing feature
in EDS. You'd like to be able to make a fix, but verify from the page or feature where you discovered the
EDS issue. Here's a recommended process:

- Cut a topic branch in EDS, make some changes and commit
- Find the corresponding `package.json` file in the consumer app. For example, in monorepo it would be in [frontend/package.json](https://github.com/getethos/ethos/blob/cfe5122f12ce5ff84c00cda58fcc0b5d9f3d9534/frontend/package.json#L98)
- Point to your new topic branch:

```shell
"ethos-design-system": "github:getethos/ethos-design-system#topic-branch"
```

- Now do `yarn install` to bring in the latest EDS pointing to your topic branch
- Tricky part: if you are continuing to make commits to `topic-branch`, subsequent `yarn install`'s won't bring in your new commits! Here's the workaround:
  - find the corresponding [yarn.lock](https://github.com/getethos/ethos/blob/cfe5122f12ce5ff84c00cda58fcc0b5d9f3d9534/yarn.lock) and look for something like:

```shell
"ethos-design-system@github:getethos/ethos-design-system#v1.1.42":
version "1.1.42"
resolved "https://codeload.github.com/getethos/ethos-design-system/tar.gz/a7ec68c3acb611f54d24b9abb737de3b40d848d4"
dependencies:
dayjs "^1.8.16"
...
```

- Remove that whole stanza, save the lockfile, and rerun `yarn install`
- Verify the sha1 commit pointed to in the updated lock file matches your last commit to EDS

The above process is also documented in the [frontend/README.md](https://github.com/getethos/ethos/blob/cfe5122f12ce5ff84c00cda58fcc0b5d9f3d9534/frontend/README.md#ethos-design-system-aka-eds)

You should now be able to restart your consumer application and reflect your latest EDS commits.

Alternatively, you're absolutely welcome to try to leverage [yarn link](https://yarnpkg.com/lang/en/docs/cli/link/) which doesn't require an internet connection or the yarn.lock shenanigans described above. However, I had inconsistent results with linking local packages so I use the former approach.\_

### Exposing Components

In order for EDS components to be consumable via something like `import { MyComponent } from 'ethos-design-system'`, `MyComponent` will need to have been added to the component exports [index.js](https://github.com/getethos/ethos-design-system/blob/master/src/components/index.js) file.

### Typescript Definitions

If your consumer app is using Typescript, it will require that the component you wish to use has a corresponding `index.d.ts` Typescript [definition](https://github.com/getethos/ethos-design-system/blob/master/src/components/index.d.ts)—we will discuss this more in [How to submit your contribution](#how-to-submit-your-contribution) section that follows.

### Form engine components

Some EDS components are completely independent of the form engine in that they work standalone. Other components like `TextInput`, `Select`, etc.,
are generally meant to be used within forms. For example, we can compare labels vs. inputs—while labels
are in fact used within forms, they have no real coupling to the form (a label is just a stateless thing that takes
no input), while a `TextInput` does take user input, and is therefore an integral part of the form's state.

Further, when a field like `TextInput` takes user input, that input may be valid or invalid on the field level. On the form level, the combination of these various fields contribute to the form's state, and will of course contribute to whether the entire form itself is valid or invalid—important for knowing if a submit button should be enabled or disabled.

Thus, as EDS component authors, we need to make this distinction and follow some additional steps for components that interact with the form engine. Here are some common TBD:

- Inline field level errors:
  `import useErrorMessage from '../../hooks/useErrorMessage.js'`
- Validation
  See the `Form.md` examples and `src/validators/*`. Also see `hooks/useInputValidation.js` which is used by the fields to do validation via the `doValidation` function
- Form State
  See `src/hooks/useFormState.js` and `formChangeHandler` which is a callback which fields call to update the form's errors and values state. While the field controls its own state internally, the form needs to know if it has any errors (to know if the overall form is valid or not), and what its field values are (so it can later pass that to the onSubmit wrapper).

The validitiy of the entire form is essentially verified by `touched && !getFieldErrorsString()`, and so, setting error and value states via the `formChangeHandler` affects whether that form is ultimately valid or not.

- Touched
  Just like other React form libraries like [Formik](https://jaredpalmer.com/formik/docs/guides/validation#when-does-validation-run), touched means the field was focused then blurred.

_So, if your component is a simple Tag, or Sidebar, etc., and does not potentially live within a form, you can skip this section._

### Documentation

We are transitioning to use [JSDoc](http://usejsdoc.org/) comments to document all EDS components and/or props. See [Header.js](https://github.com/getethos/ethos-design-system/blob/d4c4be443d7214cc9abf0fa82d21380ed2e00a9a/src/nora/components/Header/Header.js#L46) for an example.

### CSS Modules

We use [CSS Modules]() and [CSS composition](https://github.com/css-modules/css-modules) to re-use styles, instead of global CSS where possible. Note that in EDS, `foo.module.scss` will trigger css-loader's `modules: true` enabling CSS Modules, while `foo.scss` will be treated as global CSS.

## How to submit your contribution

Pull requests are the recommended way to contribute (see [Github Flow](https://guides.github.com/introduction/flow/index.html)):

1. Fork the repo and create your branch off of `master`
2. Make your changes
3. Is your component meant to work with the form engine? If so, read [Form engine components](form-engine-components) and test it against the [Form.md](https://github.com/getethos/ethos-design-system/blob/master/src/components/Form/Form.md) to verify

_You may want to simplify your test case by using the [BugInForm](src/components/Form/BugInForm.md.example) template to simplify things._

4. Add or update tests if necessary and [run the tests](https://github.com/getethos/ethos-design-system#tests)
5. If creating a new component that should be consumable via the ethos-design-system, add it to the [component exports](https://github.com/getethos/ethos-design-system/blob/master/src/components/index.js)
6. Add a Typescript [definition](https://github.com/getethos/ethos-design-system/blob/master/src/components/index.d.ts) for your component (see [Releases](https://github.com/getethos/ethos-design-system#releases))
7. Create a [typing test](https://github.com/getethos/ethos-design-system/blob/master/src/components/index.tests.tsx) and run `yarn test:types`
8. Bump the `yarn version` which will create a new commit which will need to be pushed to github along with the new tag (see )
9. Make a pull request
10. Verify CI/CD passes and all checks have passed
