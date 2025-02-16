// Problem 1: Three ways to sum to n

// Naive approach
var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Programatical approach using recursion
var sum_to_n_b = function (n) {
  const sumRange = (min, max) =>
    min !== max ? sumRange(min, max - 1) + max : 0;
  return sumRange(0, n);
};

// Mathematical approach
var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};
