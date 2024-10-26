/** JSDoc comment like this is used for compile time type validation
 * @param {number[]} prices
 * @return {number}
 */

var check = function (nums) {   // check if array is sorted (increasing) and rotated
    // Simply check if the next number is greater than the current
    // If the array is sorted in cyclic order then the next is nums[(i+1)%nums.length]
    // in cyclic sorted array only 1 time the next number can not be greater/lesser than the current
    let countDecreasingNums = 0; // counter
    for (let i = 0; i < nums.length; i++) { 
        if (nums[i] > nums[(i + 1) % nums.length]) {// iterate over nums, check and count
            countDecreasingNums++; 
        }
    }
    if (countDecreasingNums > 1) {
        return false;
    }
    return true;
};

var plusOne = function (digits) {   // array increment by one
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i] += 1;     // simply add one and return digits
            return digits;
        }
        digits[i] = 0;       // countinuosly mark digit zero if it is 9
    }
    digits.unshift(1);       // if all digits are marked zero then add a one in the beginning and return digits
    return digits;
};

var maxProfit = function(prices) { //   Best time to buy and sell stocks
    let maxProfit = 0;      // no profit
    let minPrice = Infinity;    // highest price
    for (let price of prices){  //  look for every price
        minPrice = Math.min(minPrice, price);   //  compare cuurent price with minimum price
        const profit = price - minPrice;    // find current profit 
        maxProfit = Math.max(maxProfit, profit);    //  compare current profit with maximum profit  
    }
    return maxProfit;
};

var removeDuplicates = function (nums) {    // remove duplicates in nums
    let k = 0;
    for (let i in nums) {
        if (nums[i] !== nums[k]) {  // we found second/third... distinct number k
            k++;
            nums[k] = nums[i]   // overrides itself or previous duplicate
        }
    }
    return k + 1;
};

var removeElement = function (nums, val) {  // remove element by value
    let k = 0;  // pointer k
    for (let i = 0; i < nums.length; i++) {     // iterate over nums
        if (nums[i] !== val) {      
            nums[k] = nums[i];      //  for number not equal to given, value override itself 
            k++;
        } // for number to remove, number is overriden by next 
    } //    at the end of loop there would be one duplicate number in the array
    return k; // but only the count of distinct number will be returned excluding duplicate
};

var maxArea = function (height) {   // container with most water
    let left = 0;                   // two pointers
    let right = height.length - 1;
    let maxWater = 0;
    while (left < right) {
        const area = Math.min(height[left], height[right]) * (right - left)
        maxWater = Math.max(maxWater, area)     // update maxWater only when necessary
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
};

var searchInsert = function (nums, target) {    // search insert position
    let left = 0,
        right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
};

var firstMissingPositive = function (nums) {    // first missing positive 
    let n = nums.length;
    for (let i in nums) {                        // Place the numbers in thier correct position
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {  // while the number is in range but not in correct position
            let correctIndex = nums[i] - 1;     // swap number at i with its correct position
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]]
        }
    }
    for (let i = 0; i < n; i++) {               // Identify the first missing positive integer
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }
    return n + 1;                               // If all numbers are at their correct position return i+1
};

var trap = function (height) {  // trapping rain water
    if (height.length === 0) return 0;
    let left = 0,   // two pointer and correspoding variables
        leftMax = 0;
    let right = height.length - 1,
        rightMax = 0;
    let waterTrapped = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                waterTrapped += leftMax - height[left]
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                waterTrapped += rightMax - height[right]
            }
            right--;
        }
    }
    return waterTrapped;
};

var searchRange = function (nums, target) { // Find first and last position of an elemnet in a sorted array
    const binarySearch = (isleft) => {
        let left = 0,
            right = nums.length - 1;
        let index = -1;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                index = mid;
                if (isleft) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return index;
    }
    const start = binarySearch(true);
    if (start === -1) {
        return [-1, -1];
    }
    const end = binarySearch(false);
    return [start, end];
};
