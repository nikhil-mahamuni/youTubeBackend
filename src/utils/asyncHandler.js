const asyncHandler = (requsetHandler) => {
  (request, response, next) => {
    Promise.resolve(requsetHandler(request, response, next))
    .catch((error) => next(error))
  }
}
 
export { asyncHandler};

// const asyncHandler2 = (func) => { 
//   async (requset, response, next) => {
//     try{
//       // await func(req, res, next)
//     }
//     catch(error){
//       response.status(error.code || 5000).json({
//         sucess: false,
//         message: error.message
//       })
//     }
// }}