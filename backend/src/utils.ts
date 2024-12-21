export async function randomString(){
    const char = "1234567890qwertyuiopsdfghjkl;zxcvbnm,./QWERTYUIOPASDFGHJKLZXCVBNM<>"
    let str=''
    for(let i=0; i<10; i++){
        str = str+char[Math.floor(Math.random()* char.length)]
    }
    return str
}