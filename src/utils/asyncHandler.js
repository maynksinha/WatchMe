export const asyncHandler = (requestHandler) => {
    return async (req, resp, next) => {
        try {
            await requestHandler(req, resp, next)
        }
        catch (err) {
            resp.status(err.code || 500).json({
                success: false,
                message: err.message,
            })
            next(err);
        }
    }
}


// In promise syntax 

// export const asyncHandler = (handlerFunc)=> 
//     (req,res,next) => {
//         Promise.resolve(handlerFunc(req,res,next)).catch((error)=> next(error))
     
// }


// proper flow should be 

// Controller throws error
//    ↓
// asyncHandler catches it
//    ↓
// next(err)
//    ↓
// Global Error Middleware
//    ↓
// Response sent