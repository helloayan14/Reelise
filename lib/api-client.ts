import { IVideo } from "@/models/Video"

export type videoFormData=Omit<IVideo,"_id">
type FetchOptions ={
      method?:"GET" |  "POST" | "DELETE",
      body?:string | FormData | Blob | ArrayBuffer | Record<string, unknown>;
      headers?:Record<string,string>
}

class ApiClient{
    private async Myfetch<T>(
        endpoint:string,
        options:FetchOptions={}

    ):Promise<T>{
        const {method="GET",body,headers={}}=options
        const defaultheaders = {
            "Content-Type":"application/json",
            ...headers
        }
       const response = await fetch(`/api${endpoint}`,{
            method,
            headers:defaultheaders,
            body:body ? JSON.stringify(body) :undefined
        })
        if(!response.ok){
            throw new Error(await response.text())


        }

        return response.json()
    }

    async getvideos(){
        return this.Myfetch<IVideo[]>("/auth/videos")
    }
     
    async getAvideo(id:string){
        return this.Myfetch<IVideo>(`/videos/${id}`)
    }

    async createvideo(videodata:videoFormData){
        return this.Myfetch("/videos",{
            method:"POST",
            body:videodata
        })
    }

}

export const apiclient= new ApiClient()