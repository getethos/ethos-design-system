import React from 'react';
import reject from './reject.js';

describe('reject', () => {
  it('prohibits', () => {
    expect(reject('*').length).toEqual(0)
    expect(reject('|').length).toEqual(0)
    expect(reject('"').length).toEqual(0)
    expect(reject("'").length).toEqual(0)
    expect(reject(':').length).toEqual(0)
    expect(reject('<').length).toEqual(0)
    expect(reject('>').length).toEqual(0)
    expect(reject('[').length).toEqual(0)
    expect(reject(']').length).toEqual(0)
    expect(reject('{').length).toEqual(0)
    expect(reject('}').length).toEqual(0)
    expect(reject('`').length).toEqual(0)
    expect(reject('(').length).toEqual(0)
    expect(reject(')').length).toEqual(0)
    expect(reject(';').length).toEqual(0)
    expect(reject('=').length).toEqual(0)
    expect(reject('@').length).toEqual(0)
    expect(reject('&').length).toEqual(0)
    expect(reject('$').length).toEqual(0)
  });

  it('prunes but leaves valid characters', () => {
    expect(reject('a*a').length).toEqual(2)
    expect(reject('a|a').length).toEqual(2)
    expect(reject('a"a').length).toEqual(2)
    expect(reject("a'a").length).toEqual(2)
    expect(reject('a:a').length).toEqual(2)
    expect(reject('a<a').length).toEqual(2)
    expect(reject('a>a').length).toEqual(2)
    expect(reject('a[a').length).toEqual(2)
    expect(reject('a]a').length).toEqual(2)
    expect(reject('a{a').length).toEqual(2)
    expect(reject('a}a').length).toEqual(2)
    expect(reject('a`a').length).toEqual(2)
    expect(reject('a(a').length).toEqual(2)
    expect(reject('a)a').length).toEqual(2)
    expect(reject('a;a').length).toEqual(2)
    expect(reject('a=a').length).toEqual(2)
    expect(reject('a@a').length).toEqual(2)
    expect(reject('a&a').length).toEqual(2)
    expect(reject('a$a').length).toEqual(2)
  });
});
