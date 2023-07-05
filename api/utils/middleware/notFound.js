const notFound = (error,request,response,next)=>{
    response.status(404).end()
}
export default notFound