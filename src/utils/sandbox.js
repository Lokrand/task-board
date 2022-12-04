let arr1 = [{priority: 'low'}, {priority: 'high'}]
let arr2 = [{priority: 'low'}, {priority: 'low'},{priority: 'low'}, {priority: 'high'},{priority: 'low'}, {priority: 'low'}]

const fnArr = (arr1, arr2) => {
//   arr1.forEach((item) => {
//     arr2 = arr2.filter((item2) => {
//         return item2.priority !== item.priority
//     })
// })
//   let arr3 = [...arr2, ...arr1]
//   return arr3;
 arr2.sort((el) => {
  if (el.priority === 'low') {
    return 1
  } else return -1
 })
 console.log(arr2)
}

console.log(fnArr(arr1,arr2))
