import React, { useState } from 'react'
import { xhrFactory } from '../lib/xhr'
import XhrError from '../lib/XhrError'
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
} from '../../components/index'

import validateExists from '../../validators/validateExists.js'

// NOTE: This ideally would be put in a more top-level place,
// and of course controlled by a more up-to-date version of
// createRoot.js (the version in our monorepo is correct)
const xhr = xhrFactory({ baseURL: 'http://localhost:9004' })

const PostGetDeleteExample = () => {
  const [posts, setPosts] = useState()
  const [
    getXhrState,
    handleXhrError,
    handleXhrSuccess,
    resetStatus,
  ] = useXhrState({})
  console.log('after useXhrState...')

  // ----------------- GET Posts -------------------- //
  const doGet = async (e) => {
    if (e) e.preventDefault()
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
    } catch (e) {
      handleXhrError(e)
    }
  }

  // ----------------- DELETE a Post -------------------- //
  const doDelete = async (e) => {
    const postId = e.currentTarget.dataset.pid
    try {
      resetStatus()
      const { err, response } = await xhr({
        path: `api/posts/${postId}`,
        method: xhr.DELETE,
      })

      // The user always does their own error-handling, if one is present.
      if (err) throw err

      // Refetch all posts so list user sees is up to date
      doGet()

      handleXhrSuccess(`Post with ID: ${postId} successfully deleted.`)
    } catch (e) {
      handleXhrError(e)
    }
  }

  // Create Post form configuration
  const newPostFormConfig = {
    formName: 'Le Form',
    autocompleteOff: true,
    formId: '123',
    fields: {
      author: {
        component: (props, options) => {
          return <TextInput {...props} placeholder="Post author..." />
        },
        name: 'author',
        labelCopy: 'Post author',
        tid: 'the-post-author',
        validators: [validateExists],
      },
      title: {
        component: (props, options) => {
          return <TextInput {...props} placeholder="Post title..." />
        },
        name: 'title',
        labelCopy: 'Post title',
        tid: 'the-post-title',
        validators: [validateExists],
      },
      content: {
        component: (props, options) => {
          return <TextAreaInput resize={true} {...props} />
        },
        name: 'title',
        labelCopy: 'Post body',
        tid: 'the-post-body',
        validators: [validateExists],
      },
    },
    onSubmit: async (formData) => {
      // ----------------- Create a Post -------------------- //
      try {
        resetStatus()
        const { err, response } = await xhr({
          path: 'api/posts',
          method: xhr.POST,
          body: JSON.stringify(formData),
        })

        // The user always does their own error-handling, if one is present.
        if (err) throw err

        // Refetch all posts so list user sees is up to date
        doGet()

        handleXhrSuccess('Post created.')
      } catch (e) {
        handleXhrError(e)
      }
    },
  }

  const xhrState = getXhrState()
  return (
    <>
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
