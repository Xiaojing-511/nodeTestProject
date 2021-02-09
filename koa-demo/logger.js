// function log( ctx ){
//     console.log(ctx.methods);
// }

// module.exports = function(ctx){
//     log(ctx);

// }

function log( ctx ) {
    console.log( ctx.method, ctx.header.host + ctx.url )
}

module.exports = function () {
  return async function ( ctx, next ) {
    log(ctx);
    await next()
  }
}