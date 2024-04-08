export const AUTHHEADERS = ()=>{
    const access = sessionStorage.getItem("token")
    return {Authorization : `Bearer ${access}`}
}