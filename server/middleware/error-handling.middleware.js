export const notFoundHandler = (req,res,next) =>{
    res.status(404).json({message: "This route does not exist"})
}


export const errorHandler = (err, req, res, next) =>{
    console.error("ERROR:", err)
        

        if(err.name === "ValidationError"){
                return res.status(400).json({message: err.message})
        }

        if(err.name === "CastError"){
                return res.status(400).json({message: "Specified ID is not valid"})
        }

        res.status(500).json({
            message: "Internal Server Errror",
            error: err.message
        })
}

