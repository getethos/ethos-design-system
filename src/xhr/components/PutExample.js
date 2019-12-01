import React, { useEffect, useState } from 'react'
/**
 * Import the Xhr factor, notification component, and xhr state custom hook
 */
import { xhrFactory } from '../lib/xhr'
import { XhrComponent } from '../lib/XhrComponent'
import { useXhrState } from '../lib/useXhrState'

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

/* for consumers outside of EDS this will be something like:
import validateExists from 'ethos-design-system/src/validators/validateExists'
*/
import validateExists from '../../validators/validateExists'

/**
 * NOTE: This ideally would be put in a more top-level place,
 * and of course controlled by a more up-to-date version of
 * createRoot.js (the version in our monorepo is correct)
 */
const xhr = xhrFactory({ baseURL: 'http://localhost:9004' })

function PutExample() {
  /**
   * Use the useXhrState hook to push Xhr status and check state
   */
  const [
    getXhrState,
    handleXhrError,
    handleXhrSuccess,
    resetStatus,
  ] = useXhrState({})

  const [posts, setPosts] = useState()

  useEffect(() => {
    async function fireGet() {
      try {
        resetStatus()
        const { err, response } = await xhr({
          path: 'api/posts',
          method: xhr.GET,
        })

        // The user always does their own error-handling, if one is present.
        if (err) throw err

        const postsData = response.parsedBody
        setPosts(postsData)
        handleXhrSuccess('Post loaded. Try making edits and Submitting')
      } catch (e) {
        handleXhrError(e)
      }
    }
    fireGet()
  }, [])

  // Update Post form configuration
  const getFieldConfig = () => {
    const post = posts[0]

    return {
      formName: 'Le Form',
      autocompleteOff: true,
      formId: '123',
      fields: {
        author: {
          // eslint-disable-next-line react/display-name
          component: (props) => {
            return (
              <TextInput
                {...props}
                initialValue={post.author}
                placeholder="Post author..."
              />
            )
          },
          name: 'author',
          labelCopy: 'Post author',
          tid: 'the-post-author',
          validators: [validateExists],
        },
        title: {
          // eslint-disable-next-line react/display-name
          component: (props) => {
            return (
              <TextInput
                {...props}
                initialValue={post.title}
                placeholder="Post title..."
              />
            )
          },
          name: 'title',
          labelCopy: 'Post title',
          tid: 'the-post-title',
          validators: [validateExists],
        },
        content: {
          // eslint-disable-next-line react/display-name
          component: (props) => {
            return (
              <TextAreaInput
                initialValue={post.content}
                resize={true}
                {...props}
              />
            )
          },
          name: 'title',
          labelCopy: 'Post body',
          tid: 'the-post-body',
          validators: [validateExists],
        },
      },

      /**
       * Here we use the Form Engine API's submit callback and fire an
       * HTTP PUT to update the post.
       */
      onSubmit: async (formData) => {
        const data = { ...formData, id: post.id }

        try {
          resetStatus()
          const { err } = await xhr({
            path: `api/posts/${post.id}`,
            method: xhr.PUT,
            body: JSON.stringify(data),
          })

          if (err) throw err

          /**
           * We'd like to present a success notification upon success response from server.
           */
          handleXhrSuccess('Post updated—Reload Page to Believe it!')
        } catch (e) {
          /**
           * We'd like to present an error notification upon error condition.
           */
          handleXhrError(e)
        }
      },
    }
  }

  /**
   * The useXhrState custom hook exposes getXhrState to allow us to obtain current
   * Xhr state and pass back to the xhr notification component.
   */
  const xhrState = getXhrState()

  return (
    <>
      <XhrComponent
        error={xhrState.error}
        successMessage={xhrState.successMessage}
      />
      {posts && (
        <section className="card">
          <div className="card-container">
            {/* Create a post Form */}
            <Form config={getFieldConfig()}>
              {(api) => {
                const { field, getFormErrorMessage, getFormIsValid } = api
                return (
                  <div>
                    <TitleLarge.Serif.Book500>
                      Update Post
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
      )}
    </>
  )
}

export default PutExample
