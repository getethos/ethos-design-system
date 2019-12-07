import React, { useState } from 'react'

/**
 * Import the Xhr factor, notification component, and xhr state custom hook
 */
import { xhrFactory } from '../lib/xhr'
import { XhrComponent } from '../lib/XhrComponent'
import { useXhrState } from '../lib/useXhrState'
import PathBuilderExample from '../lib/PathBuilderExample'

import {
  Button,
  Form,
  InfoMessage,
  Spacer,
  TextAreaInput,
  TextInput,
  TitleLarge,
  /* for consumers outside of EDS this will be ``} from 'ethos-design-system'`` */
} from '../../components/index'

import validateExists from '../../validators/validateExists.js'

const pathBuilder = new PathBuilderExample()

/**
 * NOTE: This ideally would be put in a more top-level place,
 * and of course controlled by a more up-to-date version of
 * createRoot.js (the version in our monorepo is correct)
 */
const xhr = xhrFactory({
  baseURL: 'http://localhost:9004/api',
})

const PostGetDeleteExample = () => {
  const [posts, setPosts] = useState()

  /**
   * Use the useXhrState hook to push Xhr status and check state
   */
  const [
    getXhrState,
    handleXhrError,
    handleXhrSuccess,
    resetStatus,
  ] = useXhrState({})

  /**
   * Use `xhr` to make any HTTP requests and handle success / error scenarios
   */
  const doGet = async (e) => {
    if (e) e.preventDefault()
    try {
      /**
       * Clear state
       */
      resetStatus()

      /**
       * Make the HTTP request using xhr API and the composable PathBuilder DSL
       * @see `src/xhr/src/PathBuilderExample.ts`
       */
      const path = pathBuilder.posts()

      const { err, response } = await xhr({
        path,
        method: xhr.GET,
      })

      if (err) throw err

      /**
       * Once here we can assume the request was successful thus settings state, etc.
       */
      setPosts(response.parsedBody)

      /**
       * No need to present a user notification with handleXhrSuccess as this is just a GET
       */
    } catch (e) {
      /**
       * We'd like to present an error notification upon error condition.
       */
      handleXhrError(e)
    }
  }

  /**
   * Use `xhr` to make a DELETE request
   */
  const doDelete = async (e) => {
    const postId = e.currentTarget.dataset.pid

    try {
      /**
       * Clear state
       */
      resetStatus()

      /**
       * Alternatively, consumers may call `buildPath()` and pass string to `xhr()`
       * @see `src/xhr/src/PathBuilderExample.ts`
       */
      const pathAsString = pathBuilder.delete(postId).buildPath()

      const { err } = await xhr({
        path: pathAsString,
        method: xhr.DELETE,
      })

      if (err) throw err

      // Refetch all posts so list user sees is up to date
      doGet()

      /**
       * We'd like to present a success notification upon success response from server.
       */
      handleXhrSuccess(`Post with ID: ${postId} successfully deleted.`)
    } catch (e) {
      /**
       * We'd like to present an error notification upon error condition.
       */
      handleXhrError(e)
    }
  }

  /**
   * The rest is mainly configuration setup for the Form Engine API
   */
  const newPostFormConfig = {
    formName: 'Le Form',
    autocompleteOff: true,
    formId: '123',
    fields: {
      author: {
        // eslint-disable-next-line react/display-name
        component: (props) => {
          return <TextInput {...props} placeholder="Post author..." />
        },
        name: 'author',
        labelCopy: 'Post author',
        tid: 'the-post-author',
        validators: [validateExists],
      },
      title: {
        // eslint-disable-next-line react/display-name
        component: (props) => {
          return <TextInput {...props} placeholder="Post title..." />
        },
        name: 'title',
        labelCopy: 'Post title',
        tid: 'the-post-title',
        validators: [validateExists],
      },
      content: {
        // eslint-disable-next-line react/display-name
        component: (props) => {
          return <TextAreaInput resize={true} {...props} />
        },
        name: 'title',
        labelCopy: 'Post body',
        tid: 'the-post-body',
        validators: [validateExists],
      },
    },
    /**
     * Here we use the Form Engine API's submit callback for the POST create.
     */
    onSubmit: async (formData) => {
      try {
        resetStatus()
        /**
         * Alternatively, a consumer may call `buildPath()` and pass string to `xhr()`
         * @see `src/xhr/src/PathBuilderExample.ts`
         */
        const path = pathBuilder.posts()

        /**
         * The API feels very similar to other http request. We only need to add
         * the POST body to our xhr argument.
         */
        const { err } = await xhr({
          path,
          method: xhr.POST,
          body: JSON.stringify(formData),
        })

        if (err) throw err

        // Refetch all posts so list user sees is up to date
        doGet()

        /**
         * Same flow as before.
         */
        handleXhrSuccess('Post created.')
      } catch (e) {
        handleXhrError(e)
      }
    },
  }

  /**
   * The useXhrState custom hook exposes getXhrState to allow us to obtain current
   * Xhr state and pass back to the xhr notification component.
   */
  const xhrState = getXhrState()
  return (
    <>
      {/* Present success or error notification to user */}
      <XhrComponent
        error={xhrState.error}
        successMessage={xhrState.successMessage}
      />
      <section className="card">
        <div className="card-container">
          {/* GET All Posts Form */}
          <form>
            <Button.Medium.Black onClick={doGet} type="submit">
              Get Posts
            </Button.Medium.Black>
          </form>
          <ul>
            {posts &&
              posts.map((article, idx) => {
                return (
                  <li className="post" key={idx}>
                    <div className="title-wrap">
                      <h5 className="title">Title: {article.title}</h5>
                      <button
                        className="btn-blank delete"
                        onClick={doDelete}
                        data-pid={article.id}
                      >
                        x
                      </button>
                    </div>
                    <p>Content: {article.content}</p>
                    <p>Author: {article.author}</p>
                  </li>
                )
              })}
          </ul>
        </div>
      </section>
      <section className="card">
        <div className="card-container">
          {/* Create a post Form */}
          <Form config={newPostFormConfig}>
            {(api) => {
              const { field, getFormErrorMessage, getFormIsValid } = api
              return (
                <div>
                  <TitleLarge.Serif.Book500>
                    Create a Post
                  </TitleLarge.Serif.Book500>

                  <Spacer.H16 />

                  {getFormErrorMessage() && (
                    <>
                      <InfoMessage.Alert.Error>
                        {getFormErrorMessage()}
                      </InfoMessage.Alert.Error>
                    </>
                  )}

                  {field('author')}

                  <Spacer.H16 />

                  {field('title')}

                  <Spacer.H16 />

                  {field('content')}

                  <Spacer.H16 />

                  <Button.Medium.Black
                    disabled={!getFormIsValid()}
                    type="submit"
                  >
                    Submit
                  </Button.Medium.Black>
                </div>
              )
            }}
          </Form>
        </div>
      </section>
    </>
  )
}

export default PostGetDeleteExample
