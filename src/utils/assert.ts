function  assert(condition:boolean | number,message:string){
    if(condition !== true){
        throw new Error(`assert failed mesage code is : ${message}`);
        // debugger;
    }
}


export  default  assert