import React from 'react'
import { Faq } from './Faq.js'
import renderer from 'react-test-renderer'

describe('Faq', () => {
  describe('API', () => {
    test('exports properly', () => {
      expect(Faq).toBeDefined()
    })
  })

  describe('rendering component', () => {
    test('default', () => {
      const tree = renderer.create(<Faq />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    test('default questions', () => {
      const demoQuestions = [
        {
          summary: 'First',
          content: (
            <div>
              <p>
                Culpa occaecat nulla tempor in veniam exercitation qui in
                voluptate ullamco adipisicing fugiat. Cupidatat do officia est
                Lorem anim sunt enim aliqua deserunt ut aliqua excepteur. Et
                aliqua elit in dolor reprehenderit cillum ipsum irure aliquip
                duis labore ipsum.
              </p>
              <p>
                Excepteur et laborum ea enim dolor sit Lorem et cupidatat veniam
                pariatur consequat. Occaecat amet aliqua sunt exercitation ut
                quis consectetur anim aliquip ex non laboris. Id proident labore
                et ex laborum.
              </p>
            </div>
          ),
        },
        {
          summary: 'Second',
          content:
            'Qui ad sit sunt dolore reprehenderit irure ad. Elit ipsum elit minim labore cupidatat duis est ad incididunt ea. Ea ut aliqua et reprehenderit Lorem commodo reprehenderit et commodo voluptate do proident. Fugiat amet elit commodo ad officia est irure mollit elit. Ullamco voluptate in elit commodo nulla. Labore anim do laborum laborum aliquip est cillum qui magna enim. Et nisi non laborum magna ullamco deserunt est duis cillum consectetur.',
        },
        {
          summary: 'Third',
          content:
            'Ea adipisicing excepteur nulla veniam mollit quis laborum anim quis et nisi officia. Ad eu pariatur duis duis dolore duis commodo non. Aute ipsum ex est cillum ut. Magna quis eu tempor do ullamco. Fugiat voluptate incididunt deserunt consectetur Lorem esse sit et cillum nisi.',
        },
      ]
      const tree = renderer.create(<Faq questions={demoQuestions} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
