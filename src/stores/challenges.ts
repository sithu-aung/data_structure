import { defineStore } from 'pinia'

interface Challenge {
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  starterCode: string
  solution: string
  testCases: { input: any; expected: any }[]
}

export const useChallengesStore = defineStore('challenges', {
  state: () => ({
    challenges: {
      'linked-list': [
        {
          title: 'Reverse a Linked List',
          description: 'Implement a function to reverse a singly linked list.',
          difficulty: 'Medium',
          starterCode: `class ListNode {
  val: number
  next: ListNode | null
  constructor(val: number) {
    this.val = val
    this.next = null
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  // Your code here
}`,
          solution: `class ListNode {
  val: number
  next: ListNode | null
  constructor(val: number) {
    this.val = val
    this.next = null
  }
}

function reverseList(head: ListNode | null): ListNode | null {
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
          starterCode: `function isValid(s: string): boolean {
  // Your code here
}`,
          solution: `function isValid(s: string): boolean {
  const stack: string[] = []
  const pairs: { [key: string]: string } = {
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
    } as Record<string, Challenge[]>
  })
})