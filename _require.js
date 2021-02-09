// node
function Hello(){
    var name = 'jj';
    this.sayHello = function(){
        console.log('hello'+ name);
    };
    this.setName = function(tmpName){
        name = tmpName;
    };
}
module.exports = Hello;

// es6
// 方式一
export function test1() {
    console.log('test1.....');
}

export function test2() {
    console.log('test2......');
}

// 方式二
// function test1() {
//     console.log('test1.....');
// }

// function test2() {
//     console.log('test2......');
// }

// export {test1,test2} 

// 方式三
// function test1() {
//     console.log('test1.....');
// }
// export default test1