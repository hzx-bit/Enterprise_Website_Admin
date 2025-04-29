import axios from "axios";
const upload = async(path,form)=>{
    const params = new FormData();
    for(let i in form){
        params.append(i,form[i]);
    }
    return await axios.post(path,params,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    });
};
export default upload;