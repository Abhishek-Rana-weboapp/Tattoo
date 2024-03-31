export const AUTHHEADERS = ()=>{
    const access = sessionStorage.getItem("token")
    console.log(access)
    return {Authorization : `Bearer ${access}`}
}