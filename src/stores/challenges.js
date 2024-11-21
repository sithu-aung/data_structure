import { defineStore } from 'pinia'

export const useChallengesStore = defineStore('challenges', {
  state: () => ({
    challenges: {
      'linked-list': [
        {
          title: 'Reverse a Linked List',
          description: 'Implement a function to reverse a singly linked list.',
          difficulty: 'Medium',
          starterCode: `function reverseList(head) {
  // Your code here
}`,
          solution: `function reverseList(head) {
  let prev = null
  let current = head
  
  while (current !== null) {
    const next = current.next
    current.next = prev
    prev = current
    current = next
  }
  
  return prev
}`,
          testCases: [
            {
              input: [1, 2, 3, 4, 5],
              expected: [5, 4, 3, 2, 1]
            },
            {
              input: [1, 2],
              expected: [2, 1]
            }
          ]
        }
      ],
      'stack': [
        {
          title: 'Valid Parentheses',
          description: 'Check if a string has valid parentheses using a stack.',
          difficulty: 'Easy',
          starterCode: `function isValid(s) {
  // Your code here
}`,
          solution: `function isValid(s) {
  const stack = []
  const pairs = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  
  for (const char of s) {
    if (char in pairs) {
      stack.push(char)
    } else {
      const last = stack.pop()
      if (!last || pairs[last] !== char) {
        return false
      }
    }
  }
  
  return stack.length === 0
}`,
          testCases: [
            {
              input: '()',
              expected: true
            },
            {
              input: '()[]{}',
              expected: true
            },
            {
              input: '(]',
              expected: false
            }
          ]
        }
      ]
    }
  })
})