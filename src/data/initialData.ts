import { Problem, ClubActivity, LearningRoadmap, ProgrammingLanguage } from '../types';

export const CODE_TEMPLATES: Record<ProgrammingLanguage, string> = {
  Python: `# Python 3 Template
def solve():
    # Write your logic here
    print("Welcome to Coding Club Assistant!")
    nums = [1, 2, 3, 4, 5]
    print(f"Sample sum: {sum(nums)}")

if __name__ == "__main__":
    solve()
`,
  C: `// C Template (C99 / C11)
#include <stdio.h>

int main() {
    printf("Welcome to Coding Club Assistant!\\n");
    int arr[] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += arr[i];
    }
    printf("Sample sum: %d\\n", sum);
    return 0;
}
`,
  'C++': `// C++ Template (C++17 / C++20)
#include <iostream>
#include <vector>
#include <numeric>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    cout << "Welcome to Coding Club Assistant!" << endl;
    vector<int> nums = {1, 2, 3, 4, 5};
    int total = accumulate(nums.begin(), nums.end(), 0);
    cout << "Sample sum: " << total << endl;
    return 0;
}
`,
  Java: `// Java Template
import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Coding Club Assistant!");
        int[] nums = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int n : nums) sum += n;
        System.out.println("Sample sum: " + sum);
    }
}
`,
  JavaScript: `// JavaScript (Node.js / ES6+)
function solve() {
    console.log("Welcome to Coding Club Assistant!");
    const nums = [1, 2, 3, 4, 5];
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    console.log(\`Sample sum: \${sum}\`);
}

solve();
`,
  SQL: `-- SQL Query Template
-- College Coding Club Database Demo
CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    problems_solved INT,
    rating INT
);

INSERT INTO students VALUES 
(1, 'Aarav Sharma', 42, 1450),
(2, 'Diya Patel', 68, 1620),
(3, 'Rohan Verma', 29, 1310);

-- Query top performers
SELECT name, problems_solved, rating
FROM students
WHERE problems_solved >= 30
ORDER BY rating DESC;
`,
};

export const INITIAL_PROBLEMS: Problem[] = [
  // BEGINNER PROBLEMS
  {
    id: 'prob-1',
    title: 'Check whether a number is even or odd',
    difficulty: 'Beginner',
    topic: 'Basic Math & Conditionals',
    problemStatement: 'Given an integer n, determine whether it is even or odd. An even number is divisible by 2 with no remainder, while an odd number leaves a remainder of 1.',
    inputFormat: 'A single integer n.',
    outputFormat: 'Print "Even" if n is even, or "Odd" if n is odd.',
    constraints: ['-10^9 <= n <= 10^9'],
    sampleCases: [
      { input: '4', output: 'Even', explanation: '4 is cleanly divisible by 2 (4 % 2 == 0).' },
      { input: '7', output: 'Odd', explanation: '7 leaves remainder 1 when divided by 2.' },
    ],
    hints: [
      'Think about the modulo operator (%) which gives the remainder of integer division.',
      'A number n is even if n % 2 == 0.',
      'Remember negative numbers: in Python -3 % 2 is 1, but in C/C++ -3 % 2 is -1. Using (n % 2 == 0) works reliably across all languages.',
    ],
    starterCode: {
      Python: `def check_even_odd(n: int) -> str:
    # Return "Even" or "Odd"
    pass
`,
      C: `#include <stdio.h>

const char* check_even_odd(int n) {
    // Return "Even" or "Odd"
    return (n % 2 == 0) ? "Even" : "Odd";
}
`,
      'C++': `#include <iostream>
#include <string>

std::string checkEvenOdd(int n) {
    return (n % 2 == 0) ? "Even" : "Odd";
}
`,
      Java: `public class Solution {
    public static String checkEvenOdd(int n) {
        return (n % 2 == 0) ? "Even" : "Odd";
    }
}
`,
      JavaScript: `function checkEvenOdd(n) {
    return n % 2 === 0 ? "Even" : "Odd";
}
`,
      SQL: `SELECT 
    n,
    CASE WHEN n % 2 = 0 THEN 'Even' ELSE 'Odd' END AS result
FROM numbers;
`,
    },
    solutionCode: {
      Python: `def check_even_odd(n: int) -> str:
    return "Even" if n % 2 == 0 else "Odd"

# Test
print(check_even_odd(4)) # Even
print(check_even_odd(7)) # Odd
`,
      C: `#include <stdio.h>

const char* check_even_odd(int n) {
    return (n % 2 == 0) ? "Even" : "Odd";
}

int main() {
    printf("%s\\n", check_even_odd(4));
    return 0;
}
`,
      'C++': `#include <iostream>
using namespace std;

string checkEvenOdd(int n) {
    return (n % 2 == 0) ? "Even" : "Odd";
}
`,
      Java: `public class Solution {
    public static String checkEvenOdd(int n) {
        return (n % 2 == 0) ? "Even" : "Odd";
    }
}
`,
      JavaScript: `function checkEvenOdd(n) {
    return n % 2 === 0 ? "Even" : "Odd";
}
`,
      SQL: `SELECT n, CASE WHEN n % 2 = 0 THEN 'Even' ELSE 'Odd' END AS result FROM numbers;`,
    },
    complexity: { time: 'O(1)', space: 'O(1)' },
    suggestedTestCases: [
      { testName: 'Positive Even', input: '100', expectedOutput: 'Even' },
      { testName: 'Positive Odd', input: '99', expectedOutput: 'Odd' },
      { testName: 'Zero', input: '0', expectedOutput: 'Even' },
      { testName: 'Negative Even', input: '-4', expectedOutput: 'Even' },
    ],
    status: 'solved',
  },
  {
    id: 'prob-2',
    title: 'Reverse a string',
    difficulty: 'Beginner',
    topic: 'Strings & Two Pointers',
    problemStatement: 'Given a string s, return the reversed string. For example, "hello" becomes "olleh".',
    inputFormat: 'A string s containing printable ASCII characters.',
    outputFormat: 'Return the reversed string.',
    constraints: ['0 <= length of s <= 10^5'],
    sampleCases: [
      { input: '"hello"', output: '"olleh"', explanation: 'Characters are read from end to beginning.' },
      { input: '"CodingClub"', output: '"bulCgnidoC"' },
    ],
    hints: [
      'You can use two pointers: one starting from the beginning (left = 0) and one from the end (right = len - 1).',
      'Swap the characters at left and right, then move left forward and right backward until they meet.',
      'In Python, slicing s[::-1] reverses a string in C-level optimized time.',
    ],
    starterCode: {
      Python: `def reverse_string(s: str) -> str:
    # Write your solution
    pass
`,
      C: `#include <string.h>

void reverse_string(char* s) {
    // In-place reverse
}
`,
      'C++': `#include <string>
#include <algorithm>

std::string reverseString(std::string s) {
    // Write your solution
    return s;
}
`,
      Java: `public class Solution {
    public static String reverseString(String s) {
        // Write your solution
        return s;
    }
}
`,
      JavaScript: `function reverseString(s) {
    // Write your solution
}
`,
      SQL: `SELECT s, REVERSE(s) AS reversed FROM string_table;`,
    },
    solutionCode: {
      Python: `def reverse_string(s: str) -> str:
    # Two pointer approach or slicing
    return s[::-1]
`,
      C: `#include <stdio.h>
#include <string.h>

void reverse_string(char* s) {
    int i = 0, j = strlen(s) - 1;
    while (i < j) {
        char temp = s[i];
        s[i] = s[j];
        s[j] = temp;
        i++;
        j--;
    }
}
`,
      'C++': `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

string reverseString(string s) {
    reverse(s.begin(), s.end());
    return s;
}
`,
      Java: `public class Solution {
    public static String reverseString(String s) {
        return new StringBuilder(s).reverse().toString();
    }
}
`,
      JavaScript: `function reverseString(s) {
    return s.split('').reverse().join('');
}
`,
      SQL: `SELECT REVERSE(s) FROM text_samples;`,
    },
    complexity: { time: 'O(n)', space: 'O(1) in-place or O(n) for new string' },
    suggestedTestCases: [
      { testName: 'Standard Word', input: '"racecar"', expectedOutput: '"racecar"' },
      { testName: 'Single Char', input: '"a"', expectedOutput: '"a"' },
      { testName: 'Empty String', input: '""', expectedOutput: '""' },
      { testName: 'Spaces Included', input: '"hello world"', expectedOutput: '"dlrow olleh"' },
    ],
    status: 'solved',
  },
  {
    id: 'prob-3',
    title: 'Find the largest element in an array',
    difficulty: 'Beginner',
    topic: 'Arrays & Iteration',
    problemStatement: 'Given an array of integers arr of size n, find and return the maximum value in the array.',
    inputFormat: 'An integer array arr.',
    outputFormat: 'Return the largest integer in the array.',
    constraints: ['1 <= n <= 10^5', '-10^9 <= arr[i] <= 10^9'],
    sampleCases: [
      { input: '[3, 7, 2, 9, 5]', output: '9', explanation: '9 is the highest value in the list.' },
      { input: '[-10, -5, -20, -1]', output: '-1', explanation: '-1 is greater than -5, -10, and -20.' },
    ],
    hints: [
      'Initialize a variable max_val with the first element of the array (arr[0]), NOT with 0 (because the array might contain negative numbers).',
      'Iterate through the rest of the array from index 1 to n-1. If arr[i] > max_val, update max_val = arr[i].',
    ],
    starterCode: {
      Python: `def find_largest(arr: list[int]) -> int:
    pass
`,
      C: `int find_largest(int arr[], int n) {
    // Return maximum element
    return 0;
}
`,
      'C++': `#include <vector>
#include <algorithm>

int findLargest(const std::vector<int>& arr) {
    // Return max
    return 0;
}
`,
      Java: `public class Solution {
    public static int findLargest(int[] arr) {
        return 0;
    }
}
`,
      JavaScript: `function findLargest(arr) {
    // Write your solution
}
`,
      SQL: `SELECT MAX(value) AS max_val FROM numbers_table;`,
    },
    solutionCode: {
      Python: `def find_largest(arr: list[int]) -> int:
    if not arr:
        raise ValueError("Array cannot be empty")
    max_val = arr[0]
    for x in arr[1:]:
        if x > max_val:
            max_val = x
    return max_val
`,
      C: `int find_largest(int arr[], int n) {
    int max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max_val) {
            max_val = arr[i];
        }
    }
    return max_val;
}
`,
      'C++': `#include <vector>
#include <climits>

int findLargest(const std::vector<int>& arr) {
    int max_val = arr[0];
    for (size_t i = 1; i < arr.size(); i++) {
        if (arr[i] > max_val) max_val = arr[i];
    }
    return max_val;
}
`,
      Java: `public class Solution {
    public static int findLargest(int[] arr) {
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max;
    }
}
`,
      JavaScript: `function findLargest(arr) {
    return Math.max(...arr);
}
`,
      SQL: `SELECT MAX(val) FROM numbers;`,
    },
    complexity: { time: 'O(n)', space: 'O(1)' },
    status: 'attempted',
  },
  {
    id: 'prob-4',
    title: 'Check whether a number is prime',
    difficulty: 'Beginner',
    topic: 'Number Theory',
    problemStatement: 'Given a positive integer n, check whether n is a prime number. A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.',
    inputFormat: 'An integer n.',
    outputFormat: 'Return True / 1 if prime, False / 0 otherwise.',
    constraints: ['1 <= n <= 10^9'],
    sampleCases: [
      { input: '13', output: 'True', explanation: '13 is divisible only by 1 and 13.' },
      { input: '15', output: 'False', explanation: '15 is divisible by 3 and 5.' },
      { input: '1', output: 'False', explanation: '1 is neither prime nor composite.' },
    ],
    hints: [
      'Numbers <= 1 are not prime.',
      'You only need to check divisibility up to sqrt(n). If n has a factor greater than sqrt(n), it must have a corresponding factor smaller than sqrt(n).',
      'Optimize further by checking if n is divisible by 2 or 3 first, then step by 6 (i and i + 2).',
    ],
    starterCode: {
      Python: `def is_prime(n: int) -> bool:
    # Write your solution
    pass
`,
      C: `int is_prime(int n) {
    // 1 for prime, 0 for composite
    return 0;
}
`,
      'C++': `bool isPrime(int n) {
    return false;
}
`,
      Java: `public class Solution {
    public static boolean isPrime(int n) {
        return false;
    }
}
`,
      JavaScript: `function isPrime(n) {
    // Write your solution
}
`,
      SQL: `-- Check primality in SQL
SELECT n FROM numbers WHERE n > 1;
`,
    },
    solutionCode: {
      Python: `import math

def is_prime(n: int) -> bool:
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    # Check 6k +- 1 up to sqrt(n)
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True
`,
      C: `#include <stdbool.h>

bool is_prime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}
`,
      'C++': `bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
`,
      Java: `public class Solution {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; (long)i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
}
`,
      JavaScript: `function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}
`,
      SQL: `SELECT n, CASE WHEN NOT EXISTS (SELECT 1 FROM generate_series(2, floor(sqrt(n))::int) d WHERE n % d = 0) THEN 1 ELSE 0 END FROM tbl;`,
    },
    complexity: { time: 'O(sqrt(n))', space: 'O(1)' },
    status: 'not-started',
  },
  {
    id: 'prob-5',
    title: 'Calculate the factorial of a number',
    difficulty: 'Beginner',
    topic: 'Recursion & Iteration',
    problemStatement: 'Given non-negative integer n, calculate its factorial (n!). Factorial is the product of all positive integers less than or equal to n. 0! = 1.',
    inputFormat: 'A non-negative integer n.',
    outputFormat: 'Return n! (factorial of n).',
    constraints: ['0 <= n <= 20 (fits in 64-bit integer)'],
    sampleCases: [
      { input: '5', output: '120', explanation: '5! = 5 * 4 * 3 * 2 * 1 = 120.' },
      { input: '0', output: '1', explanation: 'By definition, 0! = 1.' },
    ],
    hints: [
      'Base case: if n == 0 or n == 1, return 1.',
      'Iterative approach: multiply a running accumulator variable from 2 up to n.',
      'Recursive approach: n! = n * factorial(n - 1).',
    ],
    starterCode: {
      Python: `def factorial(n: int) -> int:
    pass
`,
      C: `unsigned long long factorial(int n) {
    return 1;
}
`,
      'C++': `long long factorial(int n) {
    return 1;
}
`,
      Java: `public class Solution {
    public static long factorial(int n) {
        return 1L;
    }
}
`,
      JavaScript: `function factorial(n) {
    // Return factorial
}
`,
      SQL: `SELECT n FROM table_nums;`,
    },
    solutionCode: {
      Python: `def factorial(n: int) -> int:
    if n < 0:
        raise ValueError("Factorial undefined for negative numbers")
    res = 1
    for i in range(2, n + 1):
        res *= i
    return res
`,
      C: `unsigned long long factorial(int n) {
    unsigned long long res = 1;
    for (int i = 2; i <= n; i++) res *= i;
    return res;
}
`,
      'C++': `long long factorial(int n) {
    long long res = 1;
    for (int i = 2; i <= n; i++) res *= i;
    return res;
}
`,
      Java: `public class Solution {
    public static long factorial(int n) {
        long res = 1;
        for (int i = 2; i <= n; i++) res *= i;
        return res;
    }
}
`,
      JavaScript: `function factorial(n) {
    let res = 1n;
    for (let i = 2n; i <= BigInt(n); i++) res *= i;
    return Number(res);
}
`,
      SQL: `SELECT EXP(SUM(LN(i))) FROM generate_series(1, 5) i;`,
    },
    complexity: { time: 'O(n)', space: 'O(1) iterative or O(n) call stack recursive' },
    status: 'solved',
  },

  // INTERMEDIATE PROBLEMS
  {
    id: 'prob-6',
    title: 'Binary Search',
    difficulty: 'Intermediate',
    topic: 'Searching & Divide and Conquer',
    problemStatement: 'Given a sorted array of integers nums and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1 in O(log n) runtime complexity.',
    inputFormat: 'A sorted integer array nums and a target integer.',
    outputFormat: 'Return the index of target or -1.',
    constraints: ['1 <= nums.length <= 10^5', 'nums is sorted in ascending order with unique values', '-10^4 <= nums[i], target <= 10^4'],
    sampleCases: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4.' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1.' },
    ],
    hints: [
      'Maintain two pointers: low = 0 and high = len(nums) - 1.',
      'Calculate mid = low + (high - low) // 2 to avoid integer overflow.',
      'If nums[mid] == target, return mid. If nums[mid] < target, search right half (low = mid + 1). Else search left half (high = mid - 1).',
    ],
    starterCode: {
      Python: `def search(nums: list[int], target: int) -> int:
    # Must run in O(log n)
    pass
`,
      C: `int search(int* nums, int numsSize, int target) {
    return -1;
}
`,
      'C++': `#include <vector>

int search(const std::vector<int>& nums, int target) {
    return -1;
}
`,
      Java: `public class Solution {
    public int search(int[] nums, int target) {
        return -1;
    }
}
`,
      JavaScript: `function search(nums, target) {
    // Write your solution
}
`,
      SQL: `SELECT id FROM sorted_items WHERE value = :target;`,
    },
    solutionCode: {
      Python: `def search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
`,
      C: `int search(int* nums, int numsSize, int target) {
    int low = 0, high = numsSize - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
`,
      'C++': `int search(const std::vector<int>& nums, int target) {
    int low = 0, high = (int)nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
`,
      Java: `public class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}
`,
      JavaScript: `function search(nums, target) {
    let low = 0, high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
`,
      SQL: `SELECT index_col FROM indexed_table WHERE val = 9;`,
    },
    complexity: { time: 'O(log n)', space: 'O(1)' },
    status: 'solved',
  },
  {
    id: 'prob-7',
    title: 'Two Sum',
    difficulty: 'Intermediate',
    topic: 'Hash Maps & Arrays',
    problemStatement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution, and you may not use the same element twice.',
    inputFormat: 'An integer array nums and integer target.',
    outputFormat: 'Return a pair of indices [i, j].',
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
    sampleCases: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] == 2 + 7 == 9.' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] == 2 + 4 == 6.' },
    ],
    hints: [
      'A brute force O(n^2) approach checks all pairs. Can we do it in a single pass O(n)?',
      'Use a hash map to store elements we have seen so far: { number: index }.',
      'For each element num at index i, check if complement = (target - num) is already in the map.',
    ],
    starterCode: {
      Python: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Target O(n) with hash map
    pass
`,
      C: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Return indices
    return NULL;
}
`,
      'C++': `#include <vector>
#include <unordered_map>

std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    return {};
}
`,
      Java: `import java.util.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[]{};
    }
}
`,
      JavaScript: `function twoSum(nums, target) {
    // Write your solution
}
`,
      SQL: `SELECT a.idx, b.idx FROM pairs a JOIN pairs b ON a.idx != b.idx WHERE a.val + b.val = :target;`,
    },
    solutionCode: {
      Python: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`,
      C: `// Two sum using hash map in C or sorted two-pointers
`,
      'C++': `std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;
    for (int i = 0; i < (int)nums.size(); i++) {
        int comp = target - nums[i];
        if (seen.count(comp)) {
            return {seen[comp], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}
`,
      Java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}
`,
      JavaScript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) return [map.get(comp), i];
        map.set(nums[i], i);
    }
    return [];
}
`,
      SQL: `SELECT a.id, b.id FROM t a JOIN t b ON a.id < b.id WHERE a.val + b.val = 9;`,
    },
    complexity: { time: 'O(n)', space: 'O(n)' },
    status: 'attempted',
  },
  {
    id: 'prob-8',
    title: 'Valid Parentheses',
    difficulty: 'Intermediate',
    topic: 'Stacks & Strings',
    problemStatement: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. Open brackets must be closed by the same type of brackets in the correct order, and every close bracket must match a preceding open bracket.',
    inputFormat: 'A string s.',
    outputFormat: 'Return True if valid, False otherwise.',
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only: ()[]{}'],
    sampleCases: [
      { input: 's = "()[]{}"', output: 'True' },
      { input: 's = "(]"', output: 'False', explanation: 'Mismatched closing bracket.' },
      { input: 's = "([)]"', output: 'False', explanation: 'Wrong closing order.' },
    ],
    hints: [
      'Use a Stack data structure (LIFO - Last In, First Out).',
      'When you see an opening bracket, push it onto the stack.',
      'When you see a closing bracket, check if the stack is non-empty and if the top matches the corresponding opening bracket. Pop it. If not matching, return False.',
      'At the end of the string, the stack must be empty for the string to be valid.',
    ],
    starterCode: {
      Python: `def is_valid(s: str) -> bool:
    # Use stack
    pass
`,
      C: `int isValid(char* s) {
    return 0;
}
`,
      'C++': `#include <string>
#include <stack>

bool isValid(std::string s) {
    return false;
}
`,
      Java: `import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {
        return false;
    }
}
`,
      JavaScript: `function isValid(s) {
    // Write your solution
}
`,
      SQL: `-- String bracket balance check`,
    },
    solutionCode: {
      Python: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack
`,
      C: `#include <stdbool.h>
#include <string.h>

bool isValid(char* s) {
    int len = strlen(s);
    char stack[len + 1];
    int top = -1;
    for (int i = 0; i < len; i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') {
            stack[++top] = c;
        } else {
            if (top == -1) return false;
            char last = stack[top--];
            if (c == ')' && last != '(') return false;
            if (c == '}' && last != '{') return false;
            if (c == ']' && last != '[') return false;
        }
    }
    return top == -1;
}
`,
      'C++': `bool isValid(std::string s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            if (c == ')' && st.top() != '(') return false;
            if (c == '}' && st.top() != '{') return false;
            if (c == ']' && st.top() != '[') return false;
            st.pop();
        }
    }
    return st.empty();
}
`,
      Java: `public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}
`,
      JavaScript: `function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    for (const char of s) {
        if (char in pairs) {
            if (stack.pop() !== pairs[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}
`,
      SQL: `SELECT 1;`,
    },
    complexity: { time: 'O(n)', space: 'O(n)' },
    status: 'not-started',
  },
  {
    id: 'prob-9',
    title: 'Merge two sorted arrays',
    difficulty: 'Intermediate',
    topic: 'Two Pointers & Sorting',
    problemStatement: 'You are given two integer arrays nums1 and nums2, both sorted in non-decreasing order. Merge nums1 and nums2 into a single array sorted in non-decreasing order.',
    inputFormat: 'Two sorted arrays nums1 and nums2 of size m and n.',
    outputFormat: 'Return the merged sorted array.',
    constraints: ['0 <= m, n <= 10^4', '-10^9 <= nums1[i], nums2[j] <= 10^9'],
    sampleCases: [
      { input: 'nums1 = [1,2,3], nums2 = [2,5,6]', output: '[1,2,2,3,5,6]' },
      { input: 'nums1 = [1], nums2 = []', output: '[1]' },
    ],
    hints: [
      'Since both arrays are already sorted, you can compare the smallest remaining elements from both arrays using two pointers i and j.',
      'Append the smaller element to the result and advance its pointer.',
      'When one array is exhausted, append the remaining elements of the other array.',
    ],
    starterCode: {
      Python: `def merge_sorted_arrays(nums1: list[int], nums2: list[int]) -> list[int]:
    pass
`,
      C: `void merge(int* nums1, int m, int* nums2, int n, int* result) {
    // Merge two arrays
}
`,
      'C++': `#include <vector>

std::vector<int> mergeSortedArrays(const std::vector<int>& nums1, const std::vector<int>& nums2) {
    return {};
}
`,
      Java: `public class Solution {
    public static int[] merge(int[] nums1, int[] nums2) {
        return new int[]{};
    }
}
`,
      JavaScript: `function mergeSortedArrays(nums1, nums2) {
    // Write your solution
}
`,
      SQL: `SELECT val FROM a UNION ALL SELECT val FROM b ORDER BY val;`,
    },
    solutionCode: {
      Python: `def merge_sorted_arrays(nums1: list[int], nums2: list[int]) -> list[int]:
    result = []
    i, j = 0, 0
    while i < len(nums1) and j < len(nums2):
        if nums1[i] <= nums2[j]:
            result.append(nums1[i])
            i += 1
        else:
            result.append(nums2[j])
            j += 1
    result.extend(nums1[i:])
    result.extend(nums2[j:])
    return result
`,
      C: `void merge(int* nums1, int m, int* nums2, int n, int* result) {
    int i = 0, j = 0, k = 0;
    while (i < m && j < n) {
        if (nums1[i] <= nums2[j]) result[k++] = nums1[i++];
        else result[k++] = nums2[j++];
    }
    while (i < m) result[k++] = nums1[i++];
    while (j < n) result[k++] = nums2[j++];
}
`,
      'C++': `std::vector<int> mergeSortedArrays(const std::vector<int>& nums1, const std::vector<int>& nums2) {
    std::vector<int> res;
    size_t i = 0, j = 0;
    while (i < nums1.size() && j < nums2.size()) {
        if (nums1[i] <= nums2[j]) res.push_back(nums1[i++]);
        else res.push_back(nums2[j++]);
    }
    while (i < nums1.size()) res.push_back(nums1[i++]);
    while (j < nums2.size()) res.push_back(nums2[j++]);
    return res;
}
`,
      Java: `public class Solution {
    public static int[] merge(int[] nums1, int[] nums2) {
        int[] res = new int[nums1.length + nums2.length];
        int i = 0, j = 0, k = 0;
        while (i < nums1.length && j < nums2.length) {
            if (nums1[i] <= nums2[j]) res[k++] = nums1[i++];
            else res[k++] = nums2[j++];
        }
        while (i < nums1.length) res[k++] = nums1[i++];
        while (j < nums2.length) res[k++] = nums2[j++];
        return res;
    }
}
`,
      JavaScript: `function mergeSortedArrays(nums1, nums2) {
    const res = [];
    let i = 0, j = 0;
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) res.push(nums1[i++]);
        else res.push(nums2[j++]);
    }
    return res.concat(nums1.slice(i)).concat(nums2.slice(j));
}
`,
      SQL: `SELECT val FROM (SELECT val FROM nums1 UNION ALL SELECT val FROM nums2) t ORDER BY val;`,
    },
    complexity: { time: 'O(m + n)', space: 'O(m + n)' },
    status: 'not-started',
  },
  {
    id: 'prob-10',
    title: 'Find the maximum subarray sum',
    difficulty: 'Intermediate',
    topic: 'Dynamic Programming (Kadane\'s)',
    problemStatement: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. (Classic Kadane\'s Algorithm).',
    inputFormat: 'An integer array nums.',
    outputFormat: 'Return the maximum contiguous subarray sum.',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    sampleCases: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'Subarray [4,-1,2,1] has the largest sum = 6.' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' },
    ],
    hints: [
      'Notice that if the current running sum becomes negative, adding it to the next element will only decrease the next sum. Thus, reset running sum to 0 whenever it drops below 0.',
      'Kadane\'s recurrence: current_max = max(x, current_max + x).',
      'Track global_max = max(global_max, current_max).',
    ],
    starterCode: {
      Python: `def max_sub_array(nums: list[int]) -> int:
    # Kadane's algorithm in O(n)
    pass
`,
      C: `int maxSubArray(int* nums, int numsSize) {
    return 0;
}
`,
      'C++': `#include <vector>

int maxSubArray(const std::vector<int>& nums) {
    return 0;
}
`,
      Java: `public class Solution {
    public int maxSubArray(int[] nums) {
        return 0;
    }
}
`,
      JavaScript: `function maxSubArray(nums) {
    // Write your solution
}
`,
      SQL: `-- Maximum contiguous window`,
    },
    solutionCode: {
      Python: `def max_sub_array(nums: list[int]) -> int:
    max_so_far = nums[0]
    curr_max = nums[0]
    for x in nums[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
    return max_so_far
`,
      C: `int maxSubArray(int* nums, int numsSize) {
    int max_so_far = nums[0];
    int curr_max = nums[0];
    for (int i = 1; i < numsSize; i++) {
        curr_max = (nums[i] > curr_max + nums[i]) ? nums[i] : curr_max + nums[i];
        if (curr_max > max_so_far) max_so_far = curr_max;
    }
    return max_so_far;
}
`,
      'C++': `int maxSubArray(const std::vector<int>& nums) {
    int max_so_far = nums[0], curr_max = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        curr_max = std::max(nums[i], curr_max + nums[i]);
        max_so_far = std::max(max_so_far, curr_max);
    }
    return max_so_far;
}
`,
      Java: `public class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0], currMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currMax = Math.max(nums[i], currMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currMax);
        }
        return maxSoFar;
    }
}
`,
      JavaScript: `function maxSubArray(nums) {
    let maxSoFar = nums[0], currMax = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currMax = Math.max(nums[i], currMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, currMax);
    }
    return maxSoFar;
}
`,
      SQL: `SELECT 1;`,
    },
    complexity: { time: 'O(n)', space: 'O(1)' },
    status: 'not-started',
  },

  // ADVANCED PROBLEMS
  {
    id: 'prob-11',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Advanced',
    topic: 'Dynamic Programming & Binary Search',
    problemStatement: 'Given an integer array nums, return the length of the longest strictly increasing subsequence. A subsequence is derived from an array by deleting some or no elements without changing the order of remaining elements.',
    inputFormat: 'An integer array nums.',
    outputFormat: 'Return the maximum length as an integer.',
    constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
    sampleCases: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: 'The longest increasing subsequence is [2,3,7,101] (or [2,3,7,18]), length 4.' },
      { input: 'nums = [0,1,0,3,2,3]', output: '4', explanation: 'Subsequence [0,1,2,3], length 4.' },
    ],
    hints: [
      'Standard DP: dp[i] = max(dp[j] + 1) for all j < i with nums[j] < nums[i]. This takes O(n^2).',
      'Optimal Patience Sorting with Binary Search: Maintain an array tails where tails[i] is the smallest tail of all increasing subsequences of length i+1. This achieves O(n log n) time!',
    ],
    starterCode: {
      Python: `def length_of_lis(nums: list[int]) -> int:
    # O(n log n) or O(n^2)
    pass
`,
      C: `int lengthOfLIS(int* nums, int numsSize) {
    return 0;
}
`,
      'C++': `#include <vector>

int lengthOfLIS(const std::vector<int>& nums) {
    return 0;
}
`,
      Java: `public class Solution {
    public int lengthOfLIS(int[] nums) {
        return 0;
    }
}
`,
      JavaScript: `function lengthOfLIS(nums) {
    // Write your solution
}
`,
      SQL: `-- LIS sequence query`,
    },
    solutionCode: {
      Python: `import bisect

def length_of_lis(nums: list[int]) -> int:
    # O(n log n) using patience sorting
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)
`,
      C: `// Binary search patience sort in C
`,
      'C++': `#include <vector>
#include <algorithm>

int lengthOfLIS(const std::vector<int>& nums) {
    std::vector<int> tails;
    for (int x : nums) {
        auto it = std::lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return (int)tails.size();
}
`,
      Java: `import java.util.*;

public class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;
        for (int x : nums) {
            int i = 0, j = size;
            while (i < j) {
                int m = (i + j) / 2;
                if (tails[m] < x) i = m + 1;
                else j = m;
            }
            tails[i] = x;
            if (i == size) size++;
        }
        return size;
    }
}
`,
      JavaScript: `function lengthOfLIS(nums) {
    const tails = [];
    for (const x of nums) {
        let l = 0, r = tails.length;
        while (l < r) {
            const m = Math.floor((l + r) / 2);
            if (tails[m] < x) l = m + 1;
            else r = m;
        }
        tails[l] = x;
    }
    return tails.length;
}
`,
      SQL: `SELECT 1;`,
    },
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    status: 'not-started',
  },
  {
    id: 'prob-12',
    title: 'Coin Change',
    difficulty: 'Advanced',
    topic: 'Dynamic Programming',
    problemStatement: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount cannot be made up by any combination of coins, return -1. You have an infinite number of each kind of coin.',
    inputFormat: 'An integer array coins and integer amount.',
    outputFormat: 'Return minimum coin count or -1.',
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    sampleCases: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1 (3 coins total).' },
      { input: 'coins = [2], amount = 3', output: '-1', explanation: 'Cannot make 3 using only 2s.' },
      { input: 'coins = [1], amount = 0', output: '0' },
    ],
    hints: [
      'This is an unbounded knapsack problem. Greedy approach (picking the largest coin) does NOT always work (e.g. coins = [1,3,4], amount = 6: greedy gives 4+1+1=3 coins, but optimal is 3+3=2 coins).',
      'Use 1D DP: dp[i] is the minimum coins needed for amount i.',
      'Initialize dp array with infinity, dp[0] = 0.',
      'For each coin c, iterate i from c to amount: dp[i] = min(dp[i], dp[i - c] + 1).',
    ],
    starterCode: {
      Python: `def coin_change(coins: list[int], amount: int) -> int:
    pass
`,
      C: `int coinChange(int* coins, int coinsSize, int amount) {
    return -1;
}
`,
      'C++': `#include <vector>

int coinChange(const std::vector<int>& coins, int amount) {
    return -1;
}
`,
      Java: `public class Solution {
    public int coinChange(int[] coins, int amount) {
        return -1;
    }
}
`,
      JavaScript: `function coinChange(coins, amount) {
    // Write your solution
}
`,
      SQL: `-- Coin change combinations query`,
    },
    solutionCode: {
      Python: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for i in range(coin, amount + 1):
            if dp[i - coin] != float('inf'):
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1
`,
      C: `#include <stdio.h>
#include <stdlib.h>

int coinChange(int* coins, int coinsSize, int amount) {
    int* dp = (int*)malloc((amount + 1) * sizeof(int));
    for (int i = 0; i <= amount; i++) dp[i] = amount + 1;
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < coinsSize; j++) {
            if (coins[j] <= i && dp[i - coins[j]] != amount + 1) {
                if (dp[i - coins[j]] + 1 < dp[i]) {
                    dp[i] = dp[i - coins[j]] + 1;
                }
            }
        }
    }
    int res = (dp[amount] > amount) ? -1 : dp[amount];
    free(dp);
    return res;
}
`,
      'C++': `int coinChange(const std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] = std::min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
`,
      Java: `import java.util.Arrays;

public class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
`,
      JavaScript: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}
`,
      SQL: `SELECT 1;`,
    },
    complexity: { time: 'O(coins.length * amount)', space: 'O(amount)' },
    status: 'not-started',
  },
  {
    id: 'prob-13',
    title: 'Graph Traversal using BFS and DFS',
    difficulty: 'Advanced',
    topic: 'Graphs & Queues/Recursion',
    problemStatement: 'Given an undirected connected graph represented as an adjacency list of vertices 0 to V-1, implement Breadth-First Search (BFS) and Depth-First Search (DFS) traversals starting from vertex 0. Return the order of visited nodes.',
    inputFormat: 'V (number of vertices) and adjacency list adj where adj[u] contains neighbors of u in sorted order.',
    outputFormat: 'Return two arrays: [bfs_order, dfs_order].',
    constraints: ['1 <= V <= 10^4', '0 <= E <= 2 * 10^4'],
    sampleCases: [
      { input: 'V = 5, adj = [[1,2,3], [0], [0,4], [0], [2]]', output: 'BFS: [0, 1, 2, 3, 4], DFS: [0, 1, 2, 4, 3]' },
    ],
    hints: [
      'For BFS, use a Queue (FIFO) and a boolean visited array. Enqueue source, mark visited, then while queue is non-empty: pop vertex, process, and enqueue unvisited neighbors.',
      'For DFS, use recursion (or a Stack LIFO). Mark current node as visited, process, then recursively visit each unvisited neighbor.',
      'Always guard against revisiting nodes to prevent infinite loops in cyclic graphs.',
    ],
    starterCode: {
      Python: `def bfs_dfs(V: int, adj: list[list[int]]) -> tuple[list[int], list[int]]:
    # Return (bfs_order, dfs_order)
    pass
`,
      C: `// Graph traversal in C`,
      'C++': `#include <vector>
#include <queue>

std::pair<std::vector<int>, std::vector<int>> traverseGraph(int V, const std::vector<std::vector<int>>& adj) {
    return {{}, {}};
}
`,
      Java: `import java.util.*;

public class Solution {
    // Implement BFS & DFS
}
`,
      JavaScript: `function traverseGraph(V, adj) {
    // Write your solution
}
`,
      SQL: `WITH RECURSIVE graph_cte AS (...) SELECT ...;`,
    },
    solutionCode: {
      Python: `from collections import deque

def bfs_dfs(V: int, adj: list[list[int]]) -> tuple[list[int], list[int]]:
    # BFS
    bfs_res = []
    visited_bfs = [False] * V
    q = deque([0])
    visited_bfs[0] = True
    while q:
        u = q.popleft()
        bfs_res.append(u)
        for v in adj[u]:
            if not visited_bfs[v]:
                visited_bfs[v] = True
                q.append(v)

    # DFS
    dfs_res = []
    visited_dfs = [False] * V
    def dfs(u):
        visited_dfs[u] = True
        dfs_res.append(u)
        for v in adj[u]:
            if not visited_dfs[v]:
                dfs(v)
    dfs(0)

    return bfs_res, dfs_res
`,
      C: `// BFS using array queue and DFS using recursion
`,
      'C++': `std::pair<std::vector<int>, std::vector<int>> traverseGraph(int V, const std::vector<std::vector<int>>& adj) {
    std::vector<int> bfs_res, dfs_res;
    std::vector<bool> v_bfs(V, false), v_dfs(V, false);
    
    // BFS
    std::queue<int> q;
    q.push(0);
    v_bfs[0] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        bfs_res.push_back(u);
        for (int v : adj[u]) {
            if (!v_bfs[v]) { v_bfs[v] = true; q.push(v); }
        }
    }

    // DFS
    auto dfs = [&](auto& self, int u) -> void {
        v_dfs[u] = true;
        dfs_res.push_back(u);
        for (int v : adj[u]) {
            if (!v_dfs[v]) self(self, v);
        }
    };
    dfs(dfs, 0);

    return {bfs_res, dfs_res};
}
`,
      Java: `public class Solution {
    // Implementation of BFS with Queue and DFS with recursion
}
`,
      JavaScript: `function traverseGraph(V, adj) {
    const bfs = [], dfs = [];
    const vBfs = new Array(V).fill(false);
    const vDfs = new Array(V).fill(false);

    // BFS
    const q = [0];
    vBfs[0] = true;
    while (q.length > 0) {
        const u = q.shift();
        bfs.push(u);
        for (const v of adj[u]) {
            if (!vBfs[v]) { vBfs[v] = true; q.push(v); }
        }
    }

    // DFS
    function dfsVisit(u) {
        vDfs[u] = true;
        dfs.push(u);
        for (const v of adj[u]) {
            if (!vDfs[v]) dfsVisit(v);
        }
    }
    dfsVisit(0);
    return { bfs, dfs };
}
`,
      SQL: `SELECT 1;`,
    },
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    status: 'not-started',
  },
  {
    id: 'prob-14',
    title: 'Shortest path using Dijkstra’s algorithm',
    difficulty: 'Advanced',
    topic: 'Graph Algorithms & Priority Queue',
    problemStatement: 'Given a directed or undirected graph with V vertices (numbered 0 to V-1) and non-negative weighted edges, compute the shortest distance from a single source vertex src to all other vertices using Dijkstra’s algorithm with a min-priority queue.',
    inputFormat: 'V (number of vertices), adj list where each element is a list of pairs (neighbor, weight), and source integer src.',
    outputFormat: 'Return array dist of size V where dist[i] is shortest distance from src to i, or INF if unreachable.',
    constraints: ['1 <= V <= 10^4', '0 <= E <= 3 * 10^4', '0 <= weight <= 10^5 (non-negative)'],
    sampleCases: [
      { input: 'V = 3, adj = {0: [(1, 4), (2, 1)], 1: [(2, 2)], 2: [(1, 1)]}, src = 0', output: '[0, 2, 1]', explanation: 'Distance to 0 is 0; to 2 is 1; to 1 via 2 is 1+1=2 (better than direct edge 4).' },
    ],
    hints: [
      'Initialize dist array with infinity, dist[src] = 0.',
      'Use a Min-Heap / Priority Queue storing pairs (current_dist, node).',
      'At each step, extract node u with minimal distance. If current_dist > dist[u], skip (stale entry).',
      'Relax edges: for each neighbor (v, weight), if dist[u] + weight < dist[v], update dist[v] and push (dist[v], v) to the heap.',
      'Dijkstra requires all edge weights to be non-negative. For negative weights, Bellman-Ford must be used.',
    ],
    starterCode: {
      Python: `import heapq

def dijkstra(V: int, adj: list[list[tuple[int, int]]], src: int) -> list[int]:
    # Return shortest distance from src to all nodes
    pass
`,
      C: `// Dijkstra in C using min-heap`,
      'C++': `#include <vector>
#include <queue>

std::vector<int> dijkstra(int V, const std::vector<std::vector<std::pair<int, int>>>& adj, int src) {
    return {};
}
`,
      Java: `import java.util.*;

public class Solution {
    public static int[] dijkstra(int V, List<List<int[]>> adj, int src) {
        return new int[]{};
    }
}
`,
      JavaScript: `function dijkstra(V, adj, src) {
    // Write your solution
}
`,
      SQL: `-- Recursive shortest path CTE`,
    },
    solutionCode: {
      Python: `import heapq

def dijkstra(V: int, adj: list[list[tuple[int, int]]], src: int) -> list[int]:
    dist = [float('inf')] * V
    dist[src] = 0
    pq = [(0, src)]  # (distance, node)

    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, weight in adj[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
                
    return [d if d != float('inf') else -1 for d in dist]
`,
      C: `// Dijkstra algorithm with min-heap in C
`,
      'C++': `std::vector<int> dijkstra(int V, const std::vector<std::vector<std::pair<int, int>>>& adj, int src) {
    std::vector<int> dist(V, 1e9);
    dist[src] = 0;
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<std::pair<int, int>>> pq;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
`,
      Java: `public class Solution {
    // PriorityQueue based Dijkstra
}
`,
      JavaScript: `function dijkstra(V, adj, src) {
    const dist = new Array(V).fill(Infinity);
    dist[src] = 0;
    const visited = new Set();
    
    for (let count = 0; count < V; count++) {
        let u = -1;
        for (let i = 0; i < V; i++) {
            if (!visited.has(i) && (u === -1 || dist[i] < dist[u])) u = i;
        }
        if (u === -1 || dist[u] === Infinity) break;
        visited.add(u);
        for (const [v, w] of adj[u] || []) {
            if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
        }
    }
    return dist;
}
`,
      SQL: `SELECT 1;`,
    },
    complexity: { time: 'O((V + E) log V)', space: 'O(V + E)' },
    status: 'not-started',
  },
  {
    id: 'prob-15',
    title: 'Dynamic Programming: 0/1 Knapsack Problem',
    difficulty: 'Advanced',
    topic: 'Dynamic Programming',
    problemStatement: 'Given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. Each item can either be chosen once or left behind (0/1 choice).',
    inputFormat: 'W (capacity), wt array of size N, val array of size N.',
    outputFormat: 'Return the maximum value that can be put in the knapsack.',
    constraints: ['1 <= N <= 1000', '1 <= W <= 1000', '1 <= wt[i], val[i] <= 1000'],
    sampleCases: [
      { input: 'W = 4, val = [1, 2, 3], wt = [4, 5, 1]', output: '3', explanation: 'Item 3 has weight 1 and value 3. Fits inside capacity 4.' },
      { input: 'W = 50, val = [60, 100, 120], wt = [10, 20, 30]', output: '220', explanation: 'Pick item 2 (wt 20, val 100) and item 3 (wt 30, val 120): total weight = 50, value = 220.' },
    ],
    hints: [
      'State definition: dp[w] = maximum value achievable with knapsack weight capacity w.',
      'Space-optimized 1D array: iterate items from 0 to N-1, and iterate capacity w backwards from W down to wt[i].',
      'Why backwards? Iterating backwards ensures each item is used at most once (avoiding the unbounded knapsack reuse).',
      'Recurrence: dp[w] = max(dp[w], dp[w - wt[i]] + val[i]).',
    ],
    starterCode: {
      Python: `def knapsack_01(W: int, wt: list[int], val: list[int]) -> int:
    pass
`,
      C: `int knapSack(int W, int wt[], int val[], int n) {
    return 0;
}
`,
      'C++': `#include <vector>

int knapsack01(int W, const std::vector<int>& wt, const std::vector<int>& val) {
    return 0;
}
`,
      Java: `public class Solution {
    public static int knapSack(int W, int[] wt, int[] val) {
        return 0;
    }
}
`,
      JavaScript: `function knapsack01(W, wt, val) {
    // Write your solution
}
`,
      SQL: `-- Knapsack optimization`,
    },
    solutionCode: {
      Python: `def knapsack_01(W: int, wt: list[int], val: list[int]) -> int:
    dp = [0] * (W + 1)
    for i in range(len(wt)):
        w_item, v_item = wt[i], val[i]
        # Iterate backwards to ensure 0/1 choice
        for w in range(W, w_item - 1, -1):
            dp[w] = max(dp[w], dp[w - w_item] + v_item)
    return dp[W]
`,
      C: `int knapSack(int W, int wt[], int val[], int n) {
    int dp[W + 1];
    for (int i = 0; i <= W; i++) dp[i] = 0;
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            if (dp[w - wt[i]] + val[i] > dp[w]) {
                dp[w] = dp[w - wt[i]] + val[i];
            }
        }
    }
    return dp[W];
}
`,
      'C++': `int knapsack01(int W, const std::vector<int>& wt, const std::vector<int>& val) {
    std::vector<int> dp(W + 1, 0);
    for (size_t i = 0; i < wt.size(); i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = std::max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    return dp[W];
}
`,
      Java: `public class Solution {
    public static int knapSack(int W, int[] wt, int[] val) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < wt.length; i++) {
            for (int w = W; w >= wt[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
            }
        }
        return dp[W];
    }
}
`,
      JavaScript: `function knapsack01(W, wt, val) {
    const dp = new Array(W + 1).fill(0);
    for (let i = 0; i < wt.length; i++) {
        for (let w = W; w >= wt[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    return dp[W];
}
`,
      SQL: `SELECT 1;`,
    },
    complexity: { time: 'O(N * W)', space: 'O(W)' },
    status: 'not-started',
  },
];

export const INITIAL_ACTIVITIES: ClubActivity[] = [
  {
    id: 'act-1',
    title: 'Weekly Coding Challenge #24: Array & Pointer Mastery',
    date: '2026-10-18',
    time: '18:00 - 20:00 IST',
    type: 'Challenge',
    difficulty: 'Intermediate',
    description: 'Solve 3 curated algorithmic problems focusing on Two-Pointer patterns and Prefix Sums. Top solvers receive club leaderboard points.',
    instructions: [
      'Contest duration is 120 minutes with automatic test suite checking.',
      'Allowed languages: Python, C, C++, Java, JavaScript.',
      'Plagiarism checks are enforced.',
    ],
    location: 'Lab 402 & Online Arena',
    participantsCount: 48,
    rsvpStatus: 'attending',
    isDemo: true,
  },
  {
    id: 'act-2',
    title: 'Campus Bug Hunt & Debugging Competition',
    date: '2026-10-21',
    time: '15:30 - 17:30 IST',
    type: 'Competition',
    difficulty: 'All Levels',
    description: 'Speed-debug 5 broken codebases injected with real production bugs: off-by-one errors, memory leaks, and concurrency races.',
    instructions: [
      'Each team receives 5 buggy repositories.',
      'Submit pull requests or patches with correct unit test passes.',
      'Hints carry a 5-minute penalty.',
    ],
    location: 'Main Auditorium / Campus Cloud',
    participantsCount: 76,
    rsvpStatus: 'interested',
    isDemo: true,
  },
  {
    id: 'act-3',
    title: 'Hackathon Sprint: Full-Stack AI Prototypes',
    date: '2026-10-25',
    time: '09:00 - 21:00 IST',
    type: 'Showcase',
    difficulty: 'Intermediate',
    description: 'A 12-hour build sprint where student teams craft smart utilities for campus life using modern web frameworks and Gemini APIs.',
    instructions: [
      'Teams of 2 to 4 engineering students.',
      'Mentors will be available for architecture reviews.',
      'Final pitch: 3-minute live demo and GitHub repo evaluation.',
    ],
    location: 'Innovation & Incubation Hub',
    participantsCount: 92,
    rsvpStatus: 'attending',
    isDemo: true,
  },
  {
    id: 'act-4',
    title: 'DSA Workshop: Graph Algorithms & Dynamic Programming',
    date: '2026-10-28',
    time: '17:00 - 19:30 IST',
    type: 'Workshop',
    difficulty: 'Advanced',
    description: 'Deep dive into Dijkstra, Bellman-Ford, and 2D DP memoization patterns with practical interview problem breakdowns.',
    instructions: [
      'Bring your laptop with a configured compiler or IDE.',
      'Pre-requisite: basic understanding of queues, arrays, and recursion.',
    ],
    location: 'Computer Science Seminar Hall',
    participantsCount: 65,
    rsvpStatus: 'none',
    isDemo: true,
  },
  {
    id: 'act-5',
    title: 'Peer Code Review & Clean Architecture Clinic',
    date: '2026-11-02',
    time: '16:00 - 17:30 IST',
    type: 'Peer Review',
    difficulty: 'Beginner',
    description: 'Bring your semester project code or practice solutions to exchange honest, constructive feedback on modularity and naming.',
    instructions: [
      'Format: 15-minute 1-on-1 peer review pairs.',
      'Focus on variable names, separation of concerns, and edge case handling.',
    ],
    location: 'Coding Club Lounge',
    participantsCount: 34,
    rsvpStatus: 'interested',
    isDemo: true,
  },
  {
    id: 'act-6',
    title: 'Project Showcase: Open-Source Student Highlights',
    date: '2026-11-06',
    time: '14:00 - 16:30 IST',
    type: 'Showcase',
    difficulty: 'All Levels',
    description: 'Celebrate projects built by coding club members this term. Watch live demos, explore tech stacks, and network.',
    instructions: [
      'Open to all students, faculty, and alumni mentors.',
      'Audience voting for Community Choice Award.',
    ],
    location: 'Auditorium Hall B',
    participantsCount: 110,
    rsvpStatus: 'none',
    isDemo: true,
  },
  {
    id: 'act-7',
    title: 'Competitive Programming Practice: Speed & Accuracy Drills',
    date: '2026-11-10',
    time: '18:00 - 19:30 IST',
    type: 'Practice',
    difficulty: 'Intermediate',
    description: 'Timed drills with 30-minute rounds to simulate real coding test environments for campus placement drives.',
    instructions: [
      'Strict time limits per question.',
      'Post-contest editorial and analysis discussion.',
    ],
    location: 'Online Contest Platform',
    participantsCount: 52,
    rsvpStatus: 'none',
    isDemo: true,
  },
];

export const INITIAL_ROADMAP: LearningRoadmap = {
  title: 'Computer Engineering Placement & CIE-3 Mastery Plan',
  targetGoal: 'Master Core DSA & Pass CIE-3 Assessment with Top Marks',
  overview: 'A structured 10-milestone engineering curriculum tailored for college students covering fundamentals through advanced competitive algorithms.',
  estimatedWeeks: 10,
  milestones: [
    {
      id: 'm-1',
      order: 1,
      title: 'Programming Fundamentals & Type Systems',
      durationDays: 5,
      description: 'Master variables, memory representation, primitives, operators, and conditional flow.',
      coreTopics: ['Data types & type casting', 'Bitwise & arithmetic operators', 'Conditionals & branching logic', 'Input/Output streams'],
      practiceExercises: ['Check whether a number is even or odd', 'Leap year calculator', 'Bitwise operations practice'],
      recommendedChallenge: 'prob-1',
      completed: true,
    },
    {
      id: 'm-2',
      order: 2,
      title: 'Loops, Invariants & Iterative Logic',
      durationDays: 5,
      description: 'Understand loop termination conditions, while vs for patterns, and loop invariants.',
      coreTopics: ['For & While loops', 'Nested loops & pattern printing', 'Break & Continue mechanics', 'Loop invariants'],
      practiceExercises: ['Reverse a number', 'Check prime number', 'Pattern triangle generator'],
      recommendedChallenge: 'prob-4',
      completed: true,
    },
    {
      id: 'm-3',
      order: 3,
      title: 'Functions, Call Stack & Recursion',
      durationDays: 7,
      description: 'Learn function call frames, recursion trees, base cases, and stack overflow prevention.',
      coreTopics: ['Pass by value vs pass by reference', 'Call stack mechanics', 'Base case & recursive step', 'Tail call optimization'],
      practiceExercises: ['Factorial calculation', 'Fibonacci sequence', 'Tower of Hanoi'],
      recommendedChallenge: 'prob-5',
      completed: true,
    },
    {
      id: 'm-4',
      order: 4,
      title: 'Arrays & String Manipulation',
      durationDays: 7,
      description: 'Contiguous memory layout, two-pointer techniques, slicing, and string reversal.',
      coreTopics: ['Array memory addresses & indexing', 'Two-pointer technique', 'Sliding window basics', 'In-place array modifications'],
      practiceExercises: ['Reverse a string', 'Find the largest element', 'Remove duplicates from sorted array'],
      recommendedChallenge: 'prob-2',
      completed: false,
    },
    {
      id: 'm-5',
      order: 5,
      title: 'Searching, Sorting & Binary Search',
      durationDays: 7,
      description: 'Linear vs binary search, divide and conquer, merge sort and quick sort.',
      coreTopics: ['Binary search invariants & boundary checks', 'Merge sort & Quick sort', 'Search in rotated sorted array', 'Bisect / lower_bound'],
      practiceExercises: ['Binary search implementation', 'Search insert position', 'Merge two sorted arrays'],
      recommendedChallenge: 'prob-6',
      completed: false,
    },
    {
      id: 'm-6',
      order: 6,
      title: 'Data Structures: Stacks, Queues & Hash Maps',
      durationDays: 8,
      description: 'LIFO & FIFO mechanics, hash tables, collision resolution, and O(1) lookups.',
      coreTopics: ['Stack applications (parentheses, postfix)', 'Queue & Deque implementations', 'Hash table load factor & hashing functions', 'Two Sum pattern'],
      practiceExercises: ['Valid parentheses', 'Two Sum with hash map', 'Implement queue using stacks'],
      recommendedChallenge: 'prob-8',
      completed: false,
    },
    {
      id: 'm-7',
      order: 7,
      title: 'Algorithmic Complexity & Optimization',
      durationDays: 6,
      description: 'Master Big-O, Big-Theta, Big-Omega, space complexity, and Kadane’s algorithm.',
      coreTopics: ['Asymptotic notations', 'Master theorem for recurrence', 'Amortized complexity', 'Kadane’s maximum subarray sum'],
      practiceExercises: ['Find maximum subarray sum', 'Compute complexity for nested loops', 'Memory consumption analysis'],
      recommendedChallenge: 'prob-10',
      completed: false,
    },
    {
      id: 'm-8',
      order: 8,
      title: 'Dynamic Programming & Graph Traversal',
      durationDays: 10,
      description: 'Overlapping subproblems, optimal substructure, 0/1 Knapsack, Coin Change, BFS and DFS.',
      coreTopics: ['Top-down memoization vs Bottom-up tabulation', '0/1 Knapsack pattern', 'Graph representations (adjacency list)', 'BFS & DFS traversals'],
      practiceExercises: ['Coin change', 'Longest increasing subsequence', 'BFS & DFS traversal'],
      recommendedChallenge: 'prob-12',
      completed: false,
    },
    {
      id: 'm-9',
      order: 9,
      title: 'Advanced Graph Algorithms & Shortest Path',
      durationDays: 8,
      description: 'Greedy graphs, Dijkstra’s algorithm, Disjoint Set Union (DSU), and minimum spanning trees.',
      coreTopics: ['Dijkstra’s algorithm with priority queues', 'Kruskal’s MST algorithm', 'Topological sort & Cycle detection', 'Bellman-Ford overview'],
      practiceExercises: ['Shortest path using Dijkstra', 'Course schedule (cycle detection)', 'Network delay time'],
      recommendedChallenge: 'prob-14',
      completed: false,
    },
    {
      id: 'm-10',
      order: 10,
      title: 'Coding Interview Practice & Mini-Projects',
      durationDays: 7,
      description: 'Mock interviews, time-pressured problem solving, code review etiquette, and building clean prototypes.',
      coreTopics: ['Mock interview communication', 'Edge case checklists', 'Clean code & variable naming', 'Full-stack mini project deployment'],
      practiceExercises: ['System design basic questions', '7-day placement interview review', 'Clean code refactoring'],
      recommendedChallenge: 'prob-15',
      completed: false,
    },
  ],
  revisionTips: [
    'Always analyze Time and Space complexity before writing your first line of code.',
    'Test with boundary cases: empty inputs, arrays of size 1, negative numbers, and large inputs.',
    'Never memorize solutions: understand the core pattern (e.g., Two Pointers, Monotonic Stack, Sliding Window, DP State).',
    'Review solved problems after 3 days and 7 days (spaced repetition).',
  ],
};

export const SAMPLE_CONVERSATIONS = [
  {
    id: 'conv-1',
    title: 'Conversation 1 — Learn a concept',
    category: 'Concept Explanation',
    studentPrompt: 'Explain recursion in Python with an easy example.',
    mentorResponse: `Hello! Recursion is one of the most powerful concepts in computer science. Think of it like looking into two parallel mirrors, or like Russian nesting dolls (Matryoshka): to open the big doll, you must open the smaller doll inside it, until you reach the solid tiny doll that cannot be opened any further.

In programming:
**Recursion occurs when a function calls itself to solve a smaller subproblem of the original problem.**

Every recursive function MUST have two critical components:
1. **The Base Case**: The condition where the function stops calling itself and returns a direct result. Without this, your program will recurse infinitely and cause a \`RecursionError\` (Stack Overflow)!
2. **The Recursive Case**: The part where the function calls itself with a strictly smaller or simpler input, moving closer to the base case.

### Simple Example: Countdown Timer
\`\`\`python
def countdown(n: int) -> None:
    # 1. Base Case: Stop when n hits 0
    if n <= 0:
        print("Blast off! 🚀")
        return
    
    # Do work
    print(n)
    
    # 2. Recursive Case: Call countdown with (n - 1)
    countdown(n - 1)

countdown(3)
\`\`\`

**Call Stack Trace for \`countdown(3)\`:**
- \`countdown(3)\` prints 3, calls \`countdown(2)\`
- \`countdown(2)\` prints 2, calls \`countdown(1)\`
- \`countdown(1)\` prints 1, calls \`countdown(0)\`
- \`countdown(0)\` hits base case \`n <= 0\`, prints "Blast off! 🚀", and unwinds!

### Follow-Up Questions to Test Your Understanding:
1. What would happen if we accidentally called \`countdown(n + 1)\` instead of \`countdown(n - 1)\`?
2. Can you write a recursive function to compute \`factorial(n)\` where 5! = 5 * 4 * 3 * 2 * 1?`,
  },
  {
    id: 'conv-2',
    title: 'Conversation 2 — Debug code',
    category: 'Debugging & Diagnosis',
    studentPrompt: 'Why does my loop skip some elements in my array?',
    mentorResponse: `Great question! In almost 90% of cases in college assignments, skipping elements happens because **you are modifying (deleting from or adding to) the list while iterating over it.**

Let's look at the classic mistake and why it behaves that way:

\`\`\`python
# ❌ BUGGY CODE:
numbers = [1, 2, 2, 3, 4]
for num in numbers:
    if num == 2:
        numbers.remove(num)
print(numbers) # Output: [1, 2, 3, 4] -- Note: The second '2' was SKIPPED!
\`\`\`

### Why does this happen?
The \`for\` loop maintains an internal index pointer:
1. At index 0, it reads \`1\` (keep).
2. At index 1, it reads the first \`2\`. You call \`numbers.remove(2)\`.
3. The list shifts left: the second \`2\` now moves from index 2 to index 1!
4. The loop proceeds to index 2, which now holds \`3\`. **The second \`2\` was completely skipped!**

### The Proper Solutions:

**Option A: Create a new filtered list (Recommended in Python):**
\`\`\`python
# ✅ Clean & Pythonic: O(n)
numbers = [1, 2, 2, 3, 4]
numbers = [x for x in numbers if x != 2]
print(numbers) # [1, 3, 4]
\`\`\`

**Option B: Iterate backwards (If in-place modification is required):**
\`\`\`python
# ✅ In-place backwards iteration
numbers = [1, 2, 2, 3, 4]
for i in range(len(numbers) - 1, -1, -1):
    if numbers[i] == 2:
        del numbers[i]
print(numbers) # [1, 3, 4]
\`\`\`

Does your code resemble this pattern? If you paste your exact code snippet, I'll walk through it line by line with you!`,
  },
  {
    id: 'conv-3',
    title: 'Conversation 3 — Understand complexity',
    category: 'Complexity Analysis',
    studentPrompt: 'What is the time complexity of binary search?',
    mentorResponse: `Binary Search has a time complexity of **O(log₂ n)** (logarithmic time).

Let's understand *why* step by step using intuition and mathematics.

### 1. Intuition: Halving the Search Space
Every single comparison in binary search cuts the remaining search space exactly in half:
- Start with: $N$ elements
- After 1st step: $N / 2$ elements remain
- After 2nd step: $N / 4 = N / 2^2$ elements remain
- After 3rd step: $N / 8 = N / 2^3$ elements remain
- After $k$ steps: $N / 2^k$ elements remain

The search stops in the worst case when only 1 element remains:
$$\\frac{N}{2^k} = 1 \\implies N = 2^k \\implies k = \\log_2 N$$

So for an array of **1,000,000 elements**:
- A linear search ($O(N)$) might require **1,000,000 comparisons**.
- Binary search ($O(\\log N)$) takes at most **~20 comparisons**! ($2^{20} \\approx 1,048,576$).

### 2. Space Complexity
- **Iterative Binary Search**: **O(1) Auxiliary Space** (uses only 3 integer pointers: \`low\`, \`mid\`, \`high\`).
- **Recursive Binary Search**: **O(log n) Space** (due to call stack frames).

### 3. Strict Pre-Conditions
Binary search has one non-negotiable requirement:
- **The input data MUST be sorted** in ascending or descending order.
- Random access in $O(1)$ must be supported (like arrays or vectors). Binary search on a standard singly linked list takes $O(N)$ because finding the middle node requires traversing!

Would you like to see how to implement binary search without integer overflow bug in C++ / Java?`,
  },
  {
    id: 'conv-4',
    title: 'Conversation 4 — Practise coding',
    category: 'Independent Practice',
    studentPrompt: 'Give me an intermediate Python problem on arrays without showing the answer.',
    mentorResponse: `Here is a popular intermediate interview and coding challenge problem tailored for your level. **I will not reveal the solution** so you can practise independently!

---

### Challenge: Rotate Array Right by K Steps

#### Problem Statement
Given an integer array \`nums\` and an integer \`k\`, rotate the array to the right by \`k\` steps, where \`k\` is non-negative.

#### Example 1
- **Input**: \`nums = [1, 2, 3, 4, 5, 6, 7]\`, \`k = 3\`
- **Output**: \`[5, 6, 7, 1, 2, 3, 4]\`
- **Explanation**:
  - Rotate 1 step to the right: \`[7, 1, 2, 3, 4, 5, 6]\`
  - Rotate 2 steps to the right: \`[6, 7, 1, 2, 3, 4, 5]\`
  - Rotate 3 steps to the right: \`[5, 6, 7, 1, 2, 3, 4]\`

#### Constraints
- \`1 <= len(nums) <= 10^5\`
- \`-2^31 <= nums[i] <= 2^31 - 1\`
- \`0 <= k <= 10^5\`

#### Starter Code
\`\`\`python
def rotate(nums: list[int], k: int) -> None:
    """
    Do not return anything, modify nums in-place instead.
    """
    # Write your solution here
    pass
\`\`\`

---

### Progressive Hints (Look only if stuck!):
- **Hint 1**: What if \`k\` is greater than the length of the array? E.g., rotating 5 elements by 7 steps is the same as rotating by \`7 % 5 = 2\` steps.
- **Hint 2**: Can you solve it in $O(n)$ time using $O(1)$ extra memory? Think about what happens if you reverse the entire array first, then reverse parts of it!

Take a shot in the **Code Playground**! Whenever you're ready, paste your attempt and I'll review it or give you feedback!`,
  },
  {
    id: 'conv-5',
    title: 'Conversation 5 — Interview preparation',
    category: 'Placement & CIE-3 Prep',
    studentPrompt: 'Help me prepare for a DSA interview in seven days.',
    mentorResponse: `Here is a high-yield, realistic **7-Day DSA Placement Sprint Plan**. It focuses on the most frequent patterns tested by tech companies and engineering evaluations, rather than random problem solving.

---

### 📅 The 7-Day High-Impact Study Schedule

#### **Day 1: Arrays, Two Pointers & Sliding Window**
- **Core Concepts**: Two Pointers (opposite ends & fast/slow), Prefix Sums, Sliding Window invariant.
- **Must-Solve Problems**:
  1. Two Sum (Hash Map $O(n)$)
  2. Maximum Subarray Sum (Kadane's Algorithm)
  3. Best Time to Buy and Sell Stock
- **Target**: 3-4 problems | 2 hours practice.

#### **Day 2: Strings, Hashing & Two Pointers**
- **Core Concepts**: ASCII frequency arrays, Palindrome verification, Substring search.
- **Must-Solve Problems**:
  1. Valid Anagram & Group Anagrams
  2. Longest Substring Without Repeating Characters
  3. Valid Palindrome with character stripping
- **Target**: 3 problems | 2 hours practice.

#### **Day 3: Linked Lists & Fast-Slow Pointers**
- **Core Concepts**: Dummy head node pattern, reversing pointers, cycle detection (Floyd's algorithm).
- **Must-Solve Problems**:
  1. Reverse a Linked List (Iterative & Recursive)
  2. Detect Cycle in a Linked List
  3. Merge Two Sorted Lists
- **Target**: 3 problems | 2 hours practice.

#### **Day 4: Stacks, Queues & Monotonic Patterns**
- **Core Concepts**: LIFO matching, monotonic increasing/decreasing stack, BFS queues.
- **Must-Solve Problems**:
  1. Valid Parentheses
  2. Next Greater Element
  3. Min Stack implementation
- **Target**: 3 problems | 2 hours practice.

#### **Day 5: Trees & Binary Search (Divide & Conquer)**
- **Core Concepts**: Inorder/Preorder/Postorder traversals, Maximum Depth, Binary Search on sorted bounds.
- **Must-Solve Problems**:
  1. Binary Search on sorted array
  2. Maximum Depth of Binary Tree
  3. Invert / Mirror a Binary Tree
  4. Validate Binary Search Tree (BST)
- **Target**: 4 problems | 2.5 hours practice.

#### **Day 6: Graphs & Dynamic Programming Foundations**
- **Core Concepts**: Adjacency list representation, BFS & DFS, 1D DP tabulation.
- **Must-Solve Problems**:
  1. Number of Islands (Grid BFS/DFS)
  2. Climbing Stairs / Fibonacci DP
  3. Coin Change (Min coins)
- **Target**: 3 problems | 2.5 hours practice.

#### **Day 7: Mock Interview & Weak Area Consolidation**
- **Schedule**:
  - **Morning**: 60-minute timed mock test (2 medium problems, no compiler help).
  - **Afternoon**: Verbal explanation practice (Think out loud: Approach $\\rightarrow$ Trade-offs $\\rightarrow$ Pseudocode $\\rightarrow$ Complexity).
  - **Evening**: Review the "Golden Cheat Sheet" of edge cases (empty input, single element, negative numbers, duplicates).

---

### 💡 3 Cardinal Rules for Interview Success:
1. **Never code silently**: Clarify constraints first ("Can the array have negatives? What is the maximum size?").
2. **State brute force first**: Then explain why it's slow ($O(n^2)$) and how extra memory (Hash Map $O(n)$) or sorting ($O(n \\log n)$) optimizes it.
3. **Always write test cases** on the whiteboard or editor before telling the interviewer you are done!`,
  },
];

export const CIE3_PROJECT_SPEC = {
  challengeTitle: 'CIE-3 AI Agent Design Challenge',
  course: 'Computer Engineering - Artificial Intelligence & Software Systems',
  weightage: '20 Marks',
  appName: 'Coding Club Assistant',
  tagline: 'Learn to code. Debug smarter. Build together.',
  problemStatement: 'Computer engineering undergraduates often struggle with the transition from basic syntax to competitive programming, complex data structures, and debugging runtime exceptions. Traditional classroom lectures lack personalized 24/7 one-on-one debugging mentors, and commercial platforms either charge prohibitive subscription fees or fail to enforce pedagogical guidance (fostering passive copying over algorithmic understanding).',
  projectObjectives: [
    'Develop an intelligent, responsive web mentor using Gemini 3.8 Flash to guide students through programming concepts, syntax, and algorithmic logic.',
    'Implement structured debugging and code review workflows that identify root causes, explain mechanics, and recommend test cases without executing untrusted code on the backend.',
    'Build a comprehensive practice module with 15 progressive problems across Beginner, Intermediate, and Advanced tiers with hints and solutions.',
    'Generate dynamic, personalized learning roadmaps based on student level, goal, daily study hours, and chosen programming language.',
    'Foster coding club community engagement through interactive demo activities and automated challenge generation.',
    'Ensure production-ready, accessible UI with dark-navy developer aesthetics adhering to zero-pill discipline and strict separation of AI logic from deterministic application state.',
  ],
  existingVsProposed: [
    {
      aspect: 'Code Debugging',
      existing: 'Vague compiler error messages; students resort to copy-pasting code into public forums or waiting for lab hours.',
      proposed: 'Structured 7-step AI diagnosis identifying root cause, plain-English explanation, corrected code, key changes, test cases, and Big-O.',
    },
    {
      aspect: 'Execution Safety',
      existing: 'Unsafe eval() scripts or expensive virtualized container fleets vulnerable to fork bombs and security breaches.',
      proposed: 'Secure AI-driven static code analysis, simulated dry-run traces, and client-side safe execution without executing untrusted code on the server.',
    },
    {
      aspect: 'Learning Roadmap',
      existing: 'Static, one-size-fits-all syllabus that ignores whether a student wants to prepare for exams, placements, or hackathons.',
      proposed: 'Dynamic AI roadmap generator tailoring duration, milestones, and exercises based on student skill level, target goal, and available daily hours.',
    },
    {
      aspect: 'Pedagogy & Integrity',
      existing: 'Generic LLMs generate immediate complete answers without encouraging conceptual mastery.',
      proposed: 'Custom system instruction enforcing progressive hints, refusal to fabricate execution results, and emphasis on algorithm comprehension.',
    },
    {
      aspect: 'State Management',
      existing: 'Ephemeral chat sessions where student progress and attempted problems are lost upon page reload.',
      proposed: 'Deterministic local persistence for problem status (Solved / Attempted), streak counters, accuracy metrics, and saved queries.',
    },
  ],
  technologies: [
    { name: 'React 19 & TypeScript', role: 'Component-based interactive SPA with strict type safety.' },
    { name: 'Node.js & Express', role: 'Backend API proxy keeping Gemini API keys confidential on server-side.' },
    { name: 'Google Gemini API (@google/genai)', role: 'Flagship gemini-3.8-flash model powering natural language explanations and code analysis.' },
    { name: 'Tailwind CSS v4', role: 'Developer-grade dark navy theme with purple/blue/cyan accents.' },
    { name: 'PrismJS', role: 'Syntax highlighting engine across Python, C, C++, Java, JS, and SQL.' },
    { name: 'Lucide React & Motion', role: 'Consistent iconography and fluid UI transitions.' },
  ],
};
